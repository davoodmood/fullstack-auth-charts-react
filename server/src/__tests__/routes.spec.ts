import * as UserService from '../service/user.service';
import * as SessionService from '../service/session.service' 
import createServer from '../utils/server'
import supertest from 'supertest';
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from 'mongoose';
import config from 'config';
import { createUserSessionHandler } from '../controller/session.controller';

const demoGraphs = require("../db/demo.json");

const app = createServer();
const isDemo = config.get('demo');
// @ts-ignore
let userId, userPayload, graphPayload, userInput, sessionPayload;

if (!isDemo) {
    userId = new mongoose.Types.ObjectId().toString();
    userPayload = {
        _id : userId,
        email: 'test@example.com',
        name: 'John Doe',
    }
    graphPayload = demoGraphs;
    userInput = {
        email: 'test@example.com',
        name: 'John Doe',
        password: "Password123",
        passwordConfirmation: "Password123",
    }
    sessionPayload = {
        _id: new mongoose.Types.ObjectId().toString(),
        user: userId,
        valid: true,
        userAgent: "PostmanRuntime/8.0.1",
        createdAt: new Date('2022-23-1'),
        updatedAt: new Date('2022-23-1'),
        __v: 0,
    }
}


if (isDemo) { // This IfClause is temporary, due to graph service for MongoDB is WIP

    describe('Graphs', () => {

        if (!isDemo) {
            beforeAll( async () => {
                const mongoServer = await MongoMemoryServer.create()
                await mongoose.connect(mongoServer.getUri());
            })
            afterAll( async () => {
                await mongoose.disconnect();
                await mongoose.connection.close();
            });
        }
        
        describe('get graph route', () => {
            
            describe('given the graph does not exist', () => {
                
                it('should return a 404', async () => {
                    const graphId = 'grph_none';
                    await supertest(app).get(`/api/graphs/${graphId}`).expect(404);            
                });
                
                it('should return 403 for a user without Autorization.', async () => {
                    const graphId = 'grph_1';
                    await supertest(app)
                            .post(`/api/graphs/`)
                            .send({name: 'newGraph', data:{}})
                            .set('Accept', 'application/json')
                            .expect(403);         
                });        
            });
            
            describe('given a graph exists', () => {
                
                it('should respond with the specified graph', async () => {
                    const graphId = 'grph_1';
                    await supertest(app).get(`/api/graphs/${graphId}`).expect(demoGraphs[0]);           
                });
                
                it('should not be able to delete without Autorization header.', async () => {
                    const graphId = 'grph_1';
                    await supertest(app).delete(`/api/graphs/${graphId}`).expect(403);           
                });
            });
            
            describe('given all existing graphs are requested', () => {
                
                it('should return all available graphs.', async () => {
                    await supertest(app).get(`/api/graphs/`).expect(demoGraphs);           
                });
            });
        });
    });
}



describe('User', () => {
    describe('User registeration', () => {
        if (isDemo) {
            describe('given the system is in Demo Mode', () => {
                
                it('should return a 404 for User creation by Demo user.', async () => {
                    // 
                });      
            });
        } else {
            describe('given the username & passkey are valid', () => {
                it('should return the user payload.', async () => {
                    const createUserServiceMock = jest.spyOn(UserService, 'createUser')
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload)
                    const {
                        statusCode,
                        body
                    } = await supertest(app)
                    .post('/api/users')
                    .set('Content-Type', 'application/json')
                    // @ts-ignore
                    .send(userInput);
                    
                    expect(statusCode).toBe(200);
                    // @ts-ignore
                    expect(body).toEqual(userPayload);
                    // @ts-ignore
                    expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
                });      
            });

            describe('given the passwords do not match', () => { 
                it('should return a 400.', async () => {
                    const createUserServiceMock = jest.spyOn(UserService, 'createUser')
                    // @ts-ignore
                    .mockReturnValueOnce(userPayload);
                    const {
                        statusCode,
                        body
                    } = await supertest(app)
                    .post('/api/users')
                    .set('Content-Type', 'application/json')
                    // @ts-ignore
                    .send({...userInput, passwordConfirmation: 'passwordDoNotMatch'});
                    
                    expect(statusCode).toBe(400);
                    // @ts-ignore
                    expect(createUserServiceMock).not.toHaveBeenCalled();
                });      
            });

            describe('given the user service throws', () => { 
                it('should return a 409.', async () => {
                    const createUserServiceMock = jest.spyOn(UserService, 'createUser')
                    // @ts-ignore
                    .mockRejectedValue("Something went wrong! :(");
                    const {
                        statusCode,
                        body
                    } = await supertest(app)
                    .post('/api/users')
                    .set('Content-Type', 'application/json')
                    // @ts-ignore
                    .send({...userInput});
                    
                    expect(statusCode).toBe(409);
                    // @ts-ignore
                    expect(createUserServiceMock).toHaveBeenCalled();
                });      
            });
        }
    });
    
    describe('Session', () => {
        
        if (isDemo) {
            describe('given user enters credentials', () => {
                it('should return a 200 for successful login.', async () => {
                    await supertest(app)
                            .post(`/api/sessions/`)
                            .send({email: 'demo@demo.com', password: 'demo123456'})
                            .set('Accept', 'application/json')
                            .expect(200);
                });
            });
    
            describe('given user request session status', () => {
                it('should return a user status.', async () => {
                    await supertest(app)
                            .post(`/api/sessions/`)
                            .send({email: 'demo@demo.com', password: 'demo123456'})
                            .set('Accept', 'application/json')
                            .expect(200);
                });
            });
        } else {
            describe('given the user and passkey are valid', () => {
                it('should return a signed accessToken & refreshToken.', async () => {
                    jest.spyOn(UserService,'validatePassword')
                        // @ts-ignore
                        .mockReturnValueOnce(userPayload);
                    jest.spyOn(SessionService, 'createSession')
                        // @ts-ignore
                        .mockReturnValueOnce(sessionPayload);

                    const req = {
                        get: () => {
                            return 'a user-agent'
                        },
                        body: {
                            email: 'example@email.com',
                            password: 'SomeRandomPassword',
                        }
                    }

                    const send = jest.fn()
                    const response = {
                        send
                    }

                    // @ts-ignore
                    await createUserSessionHandler(req, response);

                    expect(send).toHaveBeenCalledWith({
                        accessToken: expect.any(String),
                        refreshToken: expect.any(String)
                    })
                });      
            });    
        }
    });
});