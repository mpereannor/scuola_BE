const { SESSION_OPTIONS, SESSION_NAME } = require('../../../config/session');

 

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


const guest = (req, res, next) => { 
    if (isLoggedIn(res)){ 
        return next(new Error('you are already logged in'))

    }
}
module.exports = { logIn, logOut, guest };