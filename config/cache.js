const {
    // REDIS_HOST= "redis-14791.c44.us-east-1-2.ec2.cloud.redislabs.com",
    // REDIS_PORT = "14791",
    // REDIS_PASSWORD="hw3CRmmg2K7wtQ9nmhLVo2Yg2bBH1i4O",

    REDIS_HOST = "127.0.0.1",
    REDIS_PORT = 6379,
    // REDIS_PASSWORD = "secret",
} = process.env;

const REDIS_OPTIONS = {
  port: REDIS_PORT,
  host: REDIS_HOST,
};

module.exports = { REDIS_OPTIONS };
