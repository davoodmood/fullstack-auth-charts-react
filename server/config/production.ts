require('dotenv').config()

const isDemo: boolean = true; // default if .env is not set.

const demoUser = {
    _id: "demo",
    email: "demo@demo.com",
    name: "Demo User",
    password: "demo123456"
}

enum mongoDBLocation {
    local = 0,
    atlas = 1
  };

const dbConnectionPoint: number = mongoDBLocation.local; // change to atlas or local to switch DB Connection

const atlasDatabaseConfig: {
    dbUser: string,
    dbPassword: string,
    dbName: string,
    dbCluster: string
} = {
    dbUser: process.env.ATLAS_DB_USER || '', 
    dbPassword: process.env.ATLAS_DB_PASS || '', 
    dbName: process.env.ATLAS_DB_NAME || '', 
    dbCluster: process.env.CLUSTER_VALUE || 'cluster0'
}

let mongoUri : string;
switch(dbConnectionPoint) { 
    case 0: { 
        mongoUri = process.env.LOCAL_DB_URI || '' // Set default local db URi
       break; 
    } 
    case 1: { 
        mongoUri = `mongodb+srv://${atlasDatabaseConfig.dbName}:${atlasDatabaseConfig.dbPassword}@${atlasDatabaseConfig.dbCluster}.qpyty.mongodb.net/${atlasDatabaseConfig.dbName}?retryWrites=true&w=majority`
       break; 
    } 
    default: { 
        mongoUri = process.env.LOCAL_DB_URI || 'mongodb://localhost:27017/maltego-server'
       break; 
    } 
 } 

export default {
    demoUser: demoUser,
    dbUri: mongoUri,
    demo: process.env.DEMO || isDemo, 
    port: process.env.PORT || 1988, 
    host: process.env.DB_HOST || 'localhost', 
    saltFactor: process.env.SALT || 10,
    accessTokenTtl: isDemo? "1y" : "15m",
    refreshTokenTtl: "1y",
    privateKey: process.env.PRIVATE_KEY || `
    -----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCecM9zKYeIs/AZQuPdpWLZtJ3axFMdm9lEYqoPeXRC5MdTXKf8
KiDq4qSQcpQD4YzGFIbX3xWB3eAGJUdDDyatTQHUw2V87i735IdW+d+OocAranGp
FW5s8TG8z/GjvJOM9smewHVAG2gojFXT5VtIq8onv9GZQbr3phyJuFoXqQIDAQAB
AoGAcr7Sjt3JyYg/X5wg+Lm5QF/dXr2GUFA5Zpxp+zEDsRqM/OOCyU4dbt7bPb2t
Uq47zIy7J4XpxpbQksLWvEsxv3Jw2s6xvDIdL33J0z0QPPVZzrwxvXfCMXnv0S6q
hpaCK/BPYU1k65OkICFbFo5rQSGvOxrLMYXza7fIqaoJNk0CQQDv4x9wKAzm9/Zd
rrraAAI0fOSqgzPQEnl3NvzmJlFK3GmY9OTasoACbqzGygkk3fCe9NkJAmMsnpx9
Ew/SxZInAkEAqRU1bWg8rQJNFNwhvLrCFzgAzJUdGm1nW+A07Sq2lT6sY+cLkHmJ
azlr3PV1wBCGCXRwLoU62ucL+uRe4wu5rwJBAIuvg5T5nVm5NhqjLmbW7nHF8Bli
QP9+YoCK4oTZ9yhSZKMOp1y56FSCQdWXu+9d1UmaZe8bFsjaq2EhgmtHZK0CQFQq
gYjvnVyFy7b5iTW4RYtnTkaIZ49TLGM4rT/txituokOsrD4DsdsVH1NDQJUV5JLq
SjluCokTAAypB26/1HMCQFDDU3URJHATmItgyg4E/jh5VNU9FKQgBwv7nnJhV98u
srL1wivW1S5Im8Kc2yDSdl/Cxn2OkuRxoI8nL6UW8QU=
-----END RSA PRIVATE KEY-----
    `,
}