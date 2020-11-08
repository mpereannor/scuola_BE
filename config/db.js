const mongoose = require("mongoose");
const dbConnect = async () => {
    // const connection = await mongoose.connect(url,
        // {
  const connection = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  console.log(`database connected: ${connection.connection.host}`);
};
module.exports = dbConnect;
