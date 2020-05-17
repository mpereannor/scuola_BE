require('dotenv').config()
const express = require("express");
const server = express();
const dbConnect = require("../database/connection")


// dbConnect()
// .then(() => { 
//     console.log('database is connected')
// })
// .catch((err) => { 
//     console.log(err)
// })
server.use(express.json());

//routes import 
const userRoute = require('../rest-api/user/routes/user-routes')

//routes use 
server.use('/api/user', userRoute)
// server.use('/api/auth', authRoute)
// const { MongoClient } = require('mongodb')

// const connectionString = "mongodb+srv://scuolaUser:9060@cluster0-mim7s.mongodb.net/test?retryWrites=true&w=majority";

// const localUrl = "mongodb://localhost:27017";

// //Promises method 
// MongoClient.connect(
//     //  localUrl, 
//      connectionString,
//      { useUnifiedTopology: true,
//         useNewUrlParser: true,
//     }
//     )
//     .then(client => { 
//         const db = client.db('school-info')
//         const users = db.collection('users') 
//         server.post('/users', (req, res) => {
//             users.insertOne(req.body)
//             .then(res => {
//                 res.status(201).json(users)
//                 console.log(res)
//             })
//             .catch(error => console.error(error))
//         })

//         server.get('/users', (req, res) => { 
//             users.find()
//             .then(res => { 
//                 console.log(res)
//             })
//             .catch(error => console.error(error))
//         }) 
//         server.get('/users/:id', (req, res) => { 
//             const { id } = req.params;

//             users.findOne(id)
//             .then(res => { 
//                 console.log(res)
//             })
//             .catch(error => console.error(error))
//         })

//         server.put('/users', (req, res) => { 
//             const { id }  = req.params;
//             users.findOneAndUpdate(id, req.body)
//             .then(res => { 
//                 console.log(res)
//             })
//             .catch(error => console.log(error))
//         })
//     })
//     .catch(error => console.error(error))


server.get("/", (req, res) => {
  res.json("scuola!!!!");
});

module.exports = server;
