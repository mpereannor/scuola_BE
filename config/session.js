const { IN_PROD, TESTING } = require("./keys");

const HALF_HOUR = 1000 * 60 * 30;
const ONE_HOUR = 1000 * 60 * 60;

const {
  SESSION_SECRET = "this is our little secret",
  SESSION_NAME = "sessionId",
  SESSION_IDLE_TIMEOUT = HALF_HOUR,
} = process.env;

const SESSION_ABSOLUTE_TIMEOUT = ONE_HOUR * 6;
const SESSION_OPTIONS = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    httpOnly: false,
    maxAge: SESSION_IDLE_TIMEOUT,
    // secure: IN_PROD,
    secure: false,
    // sameSite: true,
    sameSite: false
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};

module.exports = { SESSION_OPTIONS, SESSION_NAME, SESSION_ABSOLUTE_TIMEOUT };
