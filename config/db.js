require("dotenv").config();
const mongoose = require("mongoose");
// const uri = process.env.MONGODB_URI;
const uri = `mongodb+srv://schooladmin:schooladmin@cluster0.ad7kr.mongodb.net/scuola?retryWrites=true&w=majority`

mongoose.set("useCreateIndex", true);

const dbConnect = async () => {
    const connection = await mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log(`database connected: ${connection.connection.host}`);
};
module.exports = dbConnect;
