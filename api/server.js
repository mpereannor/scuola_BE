require("dotenv").config();

const express = require("express");
const cors = require("cors");

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
const boardRoute = require("../rest-api/board/routes/board-routes");
const reportRoute = require("../rest-api/report/routes/report-routes");
const updateRoute = require("../rest-api/update/routes/update-routes");

dbConnect();
const RedisStore = connectRedis(session);
const client = new Redis(REDIS_OPTIONS);

server.use(
  session({
    ...SESSION_OPTIONS,
    store: new RedisStore({ client }),
  })
);
server.use(express.json());
server.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    "Access-Control-Allow-Headers": true,
    "Access-Control-Allow-Credentials": true,
  })
);
server.set("trust proxy", 1);

//routes use
server.use("/api/users", userRoute);
server.use("/api/auth", authRoute);
server.use("/api/boards", boardRoute);
server.use("/api/reports", reportRoute);
server.use("/api/updates", updateRoute);

server.get("/", (req, res) => {
  res.json("scuola!!!!");
});

module.exports = server;
