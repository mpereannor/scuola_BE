const express = require("express");
const server = express();
const MongoClient = require("mongodb").MongoClient;

const connectionString =
  "mongodb+srv://scuolaUser:9060@cluster0-mim7s.mongodb.net/test?retryWrites=true&w=majority";

//callback method
// MongoClient.connect(
//   connectedString,
//   {
//     useUnifiedTopology: true,
//   },
//   (err, client) => {
//     if (err) return console.log(err);
//     console.log("Connected to DB");
//   }
// );

//promises method 
MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => { 
        const db = client.db('school-info')
        server.use()
        server.get()
        server.post()
        server.listen()
    })
    .catch(error => console.error(error))

server.use(express.json());

server.get("/", (req, res) => {
  res.json("scuola!!!!");
});

module.exports = server;
