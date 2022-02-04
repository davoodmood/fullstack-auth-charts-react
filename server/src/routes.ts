import config from "config";
import { Express, Request, Response } from "express";
import { validateRequest, requiresUser } from "./middleware"
import { 
    createUserHandler
} from "./controller/user.controller";
import {
    createUserSessionHandler,
    invalidateUserSessionHandler,
    getUserSessionsHandler,
  } from "./controller/session.controller";
import {
    createGraphHandler,
    getGraphHandler,
    updateGraphHandler,
    deleteGraphHandler
} from "./controller/graph.controller"
import {
    createDemoGraphHandler,
    getDemoGraphHandler,
    updateDemoGraphHandler,
    deleteDemoGraphHandler
} from "./controller/demo.graph.controller"
import {
    createUserSchema,
    createUserSessionSchema
  } from "./schema/user.schema";
import {
    createGraphSchema,
    updateGraphSchema,
    deleteGraphSchema,
} from "./schema/graph.schema"
const isDemo = config.get("demo") as boolean;

export default function (app: Express) {
  // Check Server Online Status    
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  
  // User Sign Up
 app.post("/api/users", validateRequest(createUserSchema), isDemo ? (req: Request, res: Response) => res.sendStatus(404) : createUserHandler);
    
  // User Sign In
  app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler);
  
  // User Session Status
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);
  
  // User Sign Out
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  // Create a graph
  app.post(
    "/api/graphs",
    [requiresUser, validateRequest(createGraphSchema)],
    isDemo ? createDemoGraphHandler : createGraphHandler
  );
    
  // update a graph
  app.put(
    "/api/graphs/:graphId",
    [requiresUser, validateRequest(updateGraphSchema)],
    isDemo ? updateDemoGraphHandler : updateGraphHandler
  );
    
  // Get all graphs
  app.get(
    "/api/graphs/",
    isDemo ? getDemoGraphHandler : getGraphHandler
  );
    
  // Get a graph
  app.get(
    "/api/graphs/:graphId",
    isDemo ? getDemoGraphHandler : getGraphHandler
  );
    
  // Get a graph
  app.delete(
    "/api/graphs/:graphId",
    [requiresUser, validateRequest(deleteGraphSchema)],
    isDemo ? deleteDemoGraphHandler : deleteGraphHandler
  );
}