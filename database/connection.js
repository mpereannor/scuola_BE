const mongoose = require('mongoose');

//connection url
// const uriLocal = "mongodb://localhost:27017"
// const uriAtlas =  process.env.MONGO_URL 

//database name
const dbConnect = async () => {
    const connection = await mongoose.connect(`mongodb+srv://schooladmin:schooladmin@cluster0-ad7kr.mongodb.net/scuola?retryWrites=true&w=majority`,{
        useNewUrlParser: true, useUnifiedTopology: true,
    })
    console.log(`database connected: ${connection.connection.host}`);
}

module.exports = dbConnect;