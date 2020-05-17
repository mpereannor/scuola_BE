const server = require("./api/server");
const port = process.env.PORT || 7000;

server.listen(port, () => {
  console.log("listening on port " + port);
});

process.on("UnhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  server.close(() => process.exit(1));
});
