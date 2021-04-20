const bcrypt = require('bcryptjs');
const User = require('../../user/models/user-models');

const validatePassword = async (req, res, next) => { 
    const user = await User.findOne({ email: req.body.email });
    if ( !user || (user && !bcrypt.compareSync(req.body.password, user.password))){ 
        res.status(400).json({ 
            message: `Email or password is incorrect`
        });
    } else { 
        next()
    }
};

module.exports = { 
    validatePassword
}