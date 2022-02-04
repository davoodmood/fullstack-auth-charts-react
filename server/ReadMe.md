# The Server: 

The server side backend build with authentication feature and graph CRUD REST API.

The server has a demo mode, which can be configured by the `.env` file. Alternatively, you can change config from the `default.ts` in `/config` with a `boolean` true or false.

The Mongo setting is WIP, but DB Authentication logic is functional and tested.

- The demo mode set to `true` allows you to use the server functionality without setting up a MongoDB.
- The demo mode set to `false` requires you to deploy a Local or Atlas MongoDb instance.

## Configuration.

To change the configuration, it's a better practice to create a `.env` file at the server's root folder, but for quick testing you can also edit the configuration by changing values from the `default.ts` in `/config` . 

You can simply use the `.env-example` and rename it to `.env` for your deployment. 

```ENV
DEMO=true                   <!-- Boolean -->
HOST=localhost              <!-- String -->
PORT= 1988                  <!-- Number -->
ATLAS_DB_USER=demo          <!-- String | If Demo is False and mongoDBLocation is Atlas -->
ATLAS_DB_PASS=demo123456    <!-- String | If Demo is False and mongoDBLocation is Atlas -->
ATLAS_DB_NAME=simpleApp     <!-- String | If Demo is False and mongoDBLocation is Atlas -->
ATLAS_DB_CLUSTER=cluster0   <!-- String | If Demo is False and mongoDBLocation is Atlas -->
LOCAL_DB_URI=               <!-- String | If Demo is False and mongoDBLocation is Local -->
PRIVATE_KEY=                <!-- String | Your Private Key -->
```

### Using the DEMO
Without a `.env` configuration, the server runs in demo mode as default. The default option can be changed in the config file. you can aslo activate it by setting the `DEMO` value in your `.env` to `true` or `false` to turn it off.

The Demo uses the given data of the challenge, and requires no DB for running the server.
Also the authenication's *Access Token* in Demo mode is set for *1 year*, which requires no Refreshing. The default demo user credentials are:

``` Javascript
// The default can be modified from /config/default.ts line 5
const demoUser = {
    _id: "demo",
    email: "demo@demo.com",
    name: "Demo User",
    password: "demo123456"
}
```

Please note that, when using the demo mode, you can not send a `POST` request for creating a new user to the `/api/user` endpoint. This action is blocked for the the demo user. All other app features are implemented based on challenge's request.

### Using MongoDB
To use the NoSQL Mongo Database, you must set the demo mode to `false`. 

You can choose your mongoDB instance Location in the config file. There are two available setting for the location of your database server. The Authentication with Mongo is ready. The Graph DB Service is Work in Progress due to time limit in the given week.

- Local 
- Atlas

```Typescript
enum mongoDBLocation {
    local = 0,
    atlas = 1
  };
// The default can be modified from /config/default.ts line 17
// change to .atlas or .local to switch DB Connection
const dbConnectionPoint: number = mongoDBLocation.local; 
```

#### Using Local MangoDB
A local instance is the default option. 

*Recommended:* To enable it you can set the `LOCAL_DB_URI` value in your `.env` file to your Local MangoDB server's URi. 

You can also change it from the *config file*.

```Typescript
// The default string can be modified from /config/default.ts line 42
mongoUri = process.env.LOCAL_DB_URI || 'mongodb://localhost:27017/maltego-server' 
```

#### Using Atlas MangoDB
To switch to you Mongo Cloud Atlas instance simple change the `dbConnectionPoint` constant to  `mongoDBLocation.atlas`. 

```Typescript
enum mongoDBLocation {
    local = 0,
    atlas = 1
  };
// The default can be modified from /config/default.ts line 17
// change to .atlas to switch to ATLAS DB Connection
const dbConnectionPoint: number = mongoDBLocation.atlas; 
```
*Recommended:* To enable it you can set the following values in your `.env` file.

```ENV
ATLAS_DB_USER=""          
ATLAS_DB_PASS=""    
ATLAS_DB_NAME=""     
ATLAS_DB_CLUSTER=cluster0  <!-- Default is Cluster0, change depending on your cluster -->
```

You can also change it from the *config file*.

```Typescript
// The default string can be modified from /config/default.ts line 25
const atlasDatabaseConfig: {
    dbUser: string,
    dbPassword: string,
    dbName: string,
    dbCluster: string
} = {
    dbUser: process.env.ATLAS_DB_USER || '', // change string for Atlas DB User
    dbPassword: process.env.ATLAS_DB_PASS || '',  // change string for Atlas DB Pass
    dbName: process.env.ATLAS_DB_NAME || '', // change string for Atlas DB Name
    dbCluster: process.env.CLUSTER_VALUE || 'cluster0' // change string for Atlas DB Cluster
}
```

## Installation

To install the server and dependencies.

```bash
npm install 
# or
yarn install
```

## Usage

To run the server in developement you need to have `nodemon` installed on your system.

```bash
npm install -g nodemon
# or
yarn global add nodemon
```

Then you can run the server in the developement with:

```bash
npm run dev
# or
yarn dev
```

Run the server in the production with:

```bash
npm run start
# or
yarn start
```

or compile Typescript to Javascript:

```bash
npm run build
# or
yarn build
```

## Test

Some tests are written for the `Demo` and `MongoDB` APIs (*graph* & *authentication*). To run the tests, you can switch the mode by revising the `/config/test.ts`:

- to test in `Demo` mode, set `demo` to `true`.
- to test in `MongoDB` mode, set `demo` to `false`.

```bash
npm run test
# or
yarn test
```

Note: The `.env` file doesn't work for setting the mode when running tests. The mode must manually be changed in the test config file, and default `demo` value is `true`.

# API LIST

The API routes are available in the `src/routes.ts`:

[API routes](http://localhost:3000/docs/#) healthcheck can be accessed on [http://localhost:3000/api/healthcheck](http://localhost:3000/api/healthcheck). Endpoints can be edited in `src/routes.ts`.

Thank you.