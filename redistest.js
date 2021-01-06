const Redis = require("ioredis");
const redis = new Redis(); 
redis.set("foo", "gratitude");

redis.get("foo", function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log(result); 
  }
});