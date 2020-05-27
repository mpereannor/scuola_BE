const { SESSION_OPTIONS, SESSION_NAME } = require('../../../config/session');

 
//helpers

    //double negation, if undefined => converted to false, if string of ObjectId => convert to true
const isLoggedIn = (req) => !!req.session.userId;

const logIn = (req, res, userId) => { 
    new Promise((resolve, reject) => {
        req.session.userId = userId
        req.session.createdAt = Date.now()
    })
}

const logOut = (req, res) => { 
    new Promise((resolve, reject) => { 
        req.session.destroy((err) => {
            if(err) reject(err)
            res.clearCookie(SESSION_NAME)
            
            resolve()
        })
    })
}

//middlewares
const guest = (req, res, next) => { 
    /*
    if (isLoggedIn(req)){ 
        return next(new Error('you are already logged in'))
    }
    */
    if(isLoggedIn(req)) {
        throw new Error('You are already logged in')
    }

    next()
}
module.exports = { logIn, logOut, guest };