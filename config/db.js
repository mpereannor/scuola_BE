const mongoose = require("mongoose");
/*
const { 
    MONGO_USERNAME = "schooladmin",
    MONGO_PASSWORD = "schooladmin",
    MONGO_HOST = "cluster0-ad7kr.mongodb.net",
    MONGO_PORT = "STH", 
    MONGO_DATABASE= "scuola"

} = process.env
*/
mongoose.set("useCreateIndex", true);

const dbConnect = async () => {
  //const connection = await mongoose.connect(process.env.MONGO_URI, {
  const connection =  await mongoose.connect("mongodb+srv://schooladmin:schooladmin@cluster0-ad7kr.mongodb.net/scuola?retryWrites=true&w=majority",{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log(`database connected: ${connection.connection.host}`);
};
module.exports = dbConnect;
