require('dotenv').config()
const express = require("express");
const server = express();
const dbConnect = require("../database/connection")

const userRoute = require('../rest-api/user/routes/user-routes')


dbConnect()
.then(() => {
    console.log('database is connected')
})
.catch((error) =>{ 
    console.log(error)
});

server.use(express.json());


server.use('/api/user', userRoute)
server.get("/", (req, res) => {
  res.json("scuola!!!!");
});

module.exports = server;
