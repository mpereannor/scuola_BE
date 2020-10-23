const mongoose = require("mongoose");
require('dotenv').config();

mongoose.set("useCreateIndex", true);

const url = 'mongodb://127.0.0.1:27017'
const dbConnect = async () => {
    const connection = await mongoose.connect(url,
        {
//   const connection = await mongoose.connect(process.env.MONGO_TEST_URI, {
//   const connection =  await mongoose.connect("mongodb+srv://schooladmin:schooladmin@cluster0-ad7kr.mongodb.net/scuola?retryWrites=true&w=majority",{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    poolSize: 10,

  });
  console.log(`database connected: ${connection.connection.host}`);
};
module.exports = dbConnect;
