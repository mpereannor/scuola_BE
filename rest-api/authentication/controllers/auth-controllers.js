const { User } = require('../../user/models/user-models');

const { registerSchema } = require('../middlewares/auth-validation')

const { logIn } = require('../middlewares/auth-middleware')




async function register  (req, res) { 
    
    try {
        await registerSchema.validateAsync(req.body, { abortEarly: false})
        
        console.log(req)
        
        const { username, fullname, email, password } = req.body
        
        const found = await User.exists({ email })
        
        
        if(found) { 
            throw new Error('Invalid email')
        }
        
        const user = await User.create({
        username, fullname, email,password
        })

        res.status(201).json(user)


    
    logIn(req, user.id)
}catch(error) { 
    res.status(500).json({ 
        message: 'Something went wrong try again', 
        error
    })
}
}


module.exports = { register }