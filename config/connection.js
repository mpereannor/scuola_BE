const mongoose = require('mongoose');
/*
const { 
    MONGO_USERNAME = 'STH',
    MONGO_PASSWORD = 'STH',
    MONGO_HOST = 'STH',
    MONGO_PORT = 'STH', 
    MONGO_DATABASE= 'STH'

} = process.env
*/
const dbConnect = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify : false
    })
    console.log(`database connected: ${connection.connection.host}`);
}

module.exports = dbConnect;