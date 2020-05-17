const dbConnect = require("../../../database/connection")

const { MongoClient } = require("mongodb")

dbConnect()
const client = new MongoClient.dbConnect();

const db = client.db('school')

const userModel = db.createCollection('users', {
    validator: { 
        $jsonSchema: { 
            bsonType: 'object',
            required: ['username', 'pwd', 'fullname', 'schoolId'],
            properties: { 
                username: {
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                pwd: { 
                    bsonType: 'string',
                    description: 'must be a string and is required'
                },
                fullname: { 
                    bsonType: 'string',
                    description: 'mustbe a string and is required'
                },
                schoolId: { 
                    bsonType: 'int',
                    description: 'must be an integer and is required'
                } 
            }
        }
    }
})

module.exports = userModel
// ({ 
//     username: "",
//     pwd: passwordPrompt(),
//     fullname: "",
//     position: "",
//     schoolId: "",
//     photo_url: "",
//     location: "",
//     is_guest: false,
//     created_at: Date.now(),
//     updated_at: Date.now(),  
// })

// connect();
// dbConnect();

// async function dbConnect () { 
//     const client = new MongoClient(uriLocal)
//     try { 
//         await client.dbConnect()
//         const db = client.db("school-info")
//         const users = db.collection('users')
//     }
// }
// async function connect () { 

//     const client = new MongoClient(uriAtlas || uriLocal)
//     const str = { useunifiedTopology: true, useNewUrlParser: true}

//     try{ 
//         await client.connect({ str })
//         const db = client.db('')

//     }

//     catch{ 

//     }

//     finally{ 

//     }
// }




// import express from 'express'
// import  from "module";