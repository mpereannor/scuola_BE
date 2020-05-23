require("dotenv").config();

const express = require("express");
const server = express();

const dbConnect = require("../config/connection");

const Redis = require('ioredis');
const connectRedis = require('connect-redis');

const session = require('express-session');

const { REDIS_OPTIONS } = require('../config/cache')
const { SESSION_OPTIONS } = require('../config/session')

//routes import
const userRoute = require("../rest-api/user/routes/user-routes");
const authRoute = require('../rest-api/authentication/routes/auth-routes')

dbConnect();
const RedisStore = connectRedis(session);
const client = new Redis(REDIS_OPTIONS);

server.use(express.json());
server.use(
    session({ 
        ...SESSION_OPTIONS,
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
