const { User } = require('../../user/models/user-models');

const { registerSchema } = require('../middlewares/auth-validation')

const { logIn } = require('../middlewares/auth-middleware')


async function register  (req, res) { 
    await registerSchema.validateAsync(req.body, { abortEarly: false})

    const { username, email, password } = req.body
    
    const found = await User.exists({ email })

    if(found) { 
        throw new Error('Invalid email')
    }

    await User.create({ 
        username, email, password
    })

    // const user = await User.create({
    //     username, email,password
    // })

    // logIn(req, user.id)

}


module.exports = { register }