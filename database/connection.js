const { MongoClient }  = require("mongodb")


//connection url
const uriLocal = "mongodb://localhost:27017"
const uriAtlas =  process.env.MONGO_URL 

//database name
const dbName = 'school'

// const dbConnect = async (err, client) => { 
//     await MongoClient.connect(
//          uriLocal, err, client, { 
//         useUnifiedTopology: true,
//         useNewUrlParser: true
//     });
//     const db = client.db(dbName)
//     client.close()
// }


//use connect method to connect to the server 
const dbConnect = MongoClient.connect(uriLocal, function(err, client) { 
    console.log('base de donnees connected successfully')
    const db = client.db(dbName);

    client.close()
})

module.exports = dbConnect