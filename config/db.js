const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

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
