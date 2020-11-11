const { SESSION_NAME } = require("../../../config/session");
const { BadRequest, Unauthorized } = require("../middlewares/auth-errors");

//helpers
const userPosition = { 
    ADMIN: 'admin',
    TUTOR: 'tutor',
    STUDENT: 'student',
    GUEST: 'guest'
}


const isLoggedIn = (req) => !!req.session.userId;

const logIn = (req, userId) => {
    req.session.userId = userId;
    req.session.createdAt = Date.now();
};


// const isAdmin = (req) => !! req.session.position
//  && !!req.session.position === userPosition.ADMIN 
// {

//     if((req.session.position && req.session.position) === userPosition.ADMIN){
//         return true
//     } 
// } 

const logOut = (req, res) => {
  new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err);
      res.clearCookie(SESSION_NAME);
      resolve();
    });
  });
};

const authorize = (req, res, next, position) => {
    // req.session.position = position;
    if(position.length && !position.includes(req.user.position)){
        throw new Unauthorized("You must be have Admin rights");
    }
    next();
        
}

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

// const authPosition = (req, res, next) => {
//     if ( !isAdmin(req)) { 
//         throw new Unauthorized("You must be have Admin rights");
//     }
    
//     next();
// }

module.exports = { 
    isLoggedIn, 
    logIn, 
    logOut, 
    guest, 
    authUser, 
    // authPosition,
    authorize
};
