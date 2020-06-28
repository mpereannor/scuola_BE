require("dotenv").config();

const express = require("express");
const cors = require('cors');
const server = express();

const dbConnect = require("../config/db");

const Redis = require("ioredis");
const connectRedis = require("connect-redis");

const session = require("express-session");

const { REDIS_OPTIONS } = require("../config/cache");
const { SESSION_OPTIONS } = require("../config/session");

//routes import
const userRoute = require("../rest-api/user/routes/user-routes");
const authRoute = require("../rest-api/authentication/routes/auth-routes");

dbConnect();
const RedisStore = connectRedis(session);
const client = new Redis(REDIS_OPTIONS);

server.use(express.json());
server.use(
  session({
    ...SESSION_OPTIONS,
    store: new RedisStore({ client }),
  })
);
server.use(cors());
//routes use
server.use("/api/user", userRoute);
server.use("/api/auth", authRoute);

server.get("/", (req, res) => {
  res.json("scuola!!!!");
});

module.exports = server;
