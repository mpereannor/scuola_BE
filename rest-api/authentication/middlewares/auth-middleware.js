const { SESSION_NAME } = require("../../../config/session");
const { BadRequest, Unauthorized } = require("../middlewares/auth-errors");

//helpers
const isLoggedIn = (req) => !!req.session.userId;

const logIn = (req, userId) => {
  new Promise((resolve, reject) => {
    req.session.userId = userId;
    req.session.createdAt = Date.now();
  });
};

const logOut = (req, res) => {
  new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err);
      res.clearCookie(SESSION_NAME);
      resolve();
    });
  });
};

//middlewares
const guest = (req, res, next) => {
  if (isLoggedIn(req)) {
    throw new BadRequest("You are already logged in");
  }

  next();
};

const authUser = (req, res, next) => {
  if (!isLoggedIn(req)) {
    throw new Unauthorized("You must be logged in");
  }
  next();
};

const cookieChecker = (req, res, next) => { 
    if(typeof req.cookies['connect.sid'] !== 'undefined') { 
        console.log(req.cookies['connect.sid'])
    } else {
        throw new BadRequest('could not find cookie!')
    }
    next();
};


module.exports = { logIn, logOut, guest, authUser, cookieChecker };
