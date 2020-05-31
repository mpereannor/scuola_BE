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

/*
const  active = async(req, res, next) => { 
    try{
        if(isLoggedIn(req)){ 
            const now = Date.now()
            const { createdAt } = req.session
            
            if( now > createdAt + SESSION_ABSOLUTE_TIMEOUT){ 
                await logOut(req, res)
            }
            throw new Unauthorized("Session expired")
        }
        next()

    }catch(error){ 
        res.status(500).json({
            message: 'Something went wrong try again', 
            error
        })
    }
}
*/

module.exports = { logIn, logOut, guest, authUser };
