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

const dbConnect = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log(`database connected: ${connection.connection.host}`);

  //    const connection = await mongoose.connect(`mongodb+srv://:${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,{
  //        useNewUrlParser: true,
  //        useUnifiedTopology: true,
  //        useFindAndModify : false
  //    })
};
module.exports = dbConnect;
