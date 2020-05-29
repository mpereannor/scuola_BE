const { IN_PROD } = require("./keys");

const HALF_HOUR = 1000 * 60 * 30;
const ONE_HOUR = 1000 * 60 * 60;
const TWO_HOURS = 1000 * 60 * 60 * 2;

const { 
    SESSION_SECRET = "this is our little secret",
    SESSION_NAME = "sessionId",
    SESSION_IDLE_TIMEOUT = HALF_HOUR
} = process.env

const SESSION_OPTIONS = { 
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    cookie: { 
        maxAge: SESSION_IDLE_TIMEOUT,
        secure: IN_PROD,
        sameSite: true,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false
}


module.exports = { SESSION_OPTIONS, SESSION_NAME }