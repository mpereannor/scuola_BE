const jwt = require('jsonwebtoken');


const checkAuth = (req, res, next) => { 
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.decoded = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: `Auth failed`
        })
    }
}




// const logIn = (req, userId) => {
//     req.session.userId = userId;
//     req.session.createdAt = Date.now();
// };

// const authorize = (req, position,) => {
//     req.session.position = position;      
// }



// const logOut = (req, res) => {
//   new Promise((resolve, reject) => {
//     req.session.destroy((err) => {
//       if (err) reject(err);
//       res.clearCookie(SESSION_NAME);
//       resolve();
//     });
//   });
// };


// //middlewares
// const guest = (req, res, next) => {
//   if (isLoggedIn(req)) {
//     throw new BadRequest("You are already logged in");
//   }

//   next();
// };

// const authUser = (req, res, next) => {
//   if (!isLoggedIn(req)) {
//     throw new Unauthorized("You must be logged in");
// }
// next();
// };

// const authAdmin = (req, res, next) => {
//     if ( !isAdmin(req)) { 
//         throw new Unauthorized("You must have Admin rights");
//     }
    
//     next();
// }
// const authTutor = (req, res, next) => {
//     if ( !isTutor(req)) { 
//         throw new Unauthorized("You must have Tutor rights");
//     }
    
//     next();
// }
// const authStudent = (req, res, next) => {
//     if ( !isStudent(req)) { 
//         throw new Unauthorized("You must have Student rights");
//     }
    
//     next();
// }



module.exports = { 
    checkAuth
    // isLoggedIn, 
    // logIn, 
    // logOut, 
    // guest, 
    // authUser, 
    // authAdmin,
    // authTutor,
    // authStudent,
    // authorize
};
