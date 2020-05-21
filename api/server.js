require("dotenv").config();
const express = require("express");
const server = express();
const dbConnect = require("../config/connection");
const Redis = require('ioredis');
const session = require('express-session');
const connectRedis = require('connect-redis');
const { REDIS_OPTIONS } = require('../config/cache')
const { SESSSION_OPTIONS } = require('../config/session')

//routes import
const userRoute = require("../rest-api/user/routes/user-routes");
const authRoute = require('../rest-api/authentication/routes/auth-routes')

dbConnect();
const RedisStore = connectRedis(session);
const client = new Redis(REDIS_OPTIONS);

client.on('connect', function() { 
    console.log('Redis client connected!!')
})

client.on('error', function(err) { 
    console.log('something went wrong' + err)
})

server.use(express.json());
server.use(
    session({ 
        ...SESSSION_OPTIONS,
        store: new RedisStore({ client }),
    })
    )

//routes use
server.use("/api/user", userRoute);
server.use('/api/auth', authRoute);
server.get("/", (req, res) => {
  res.json("scuola!!!!");
});

module.exports = server;
