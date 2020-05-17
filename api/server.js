require("dotenv").config();
const express = require("express");
const server = express();
const dbConnect = require("../config/connection");

const userRoute = require("../rest-api/user/routes/user-routes");

dbConnect();

server.use(express.json());

server.use("/api/user", userRoute);
server.get("/", (req, res) => {
  res.json("scuola!!!!");
});

module.exports = server;
