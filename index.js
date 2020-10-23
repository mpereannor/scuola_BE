const server = require("./api/server");
const port = process.env.PORT || 7000;
require('dotenv').config();


server.listen(port, () => {
  console.log("listening on port " + port);
});
