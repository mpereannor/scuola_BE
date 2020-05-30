const { User } = require("../../user/models/user-models");

const { registerSchema, loginSchema } = require("../middlewares/auth-validation")


const { logIn, logOut } = require("../middlewares/auth-middleware")




async function register  (req, res) { 
    
    try {
        await registerSchema.validateAsync(req.body, { abortEarly: false})
                
        const { username, fullname, email, password } = req.body
        
        const found = await User.exists({ email })
        
        
        if(found) { 
            throw new Error("Invalid email")
        }
        
        const user = await User.create({
        username, fullname, email,password
        })

        res.status(201).json(user)


    
    logIn(req, user.id)
}catch(error) { 
    res.status(500).json({ 
        message: "Something went wrong try again", 
        error
    })
}
}

async function login(req, res) { 
    try{ 
        await loginSchema.validateAsync(req.body, { 
            abortEarly: false
        }) 
        
        const { email, password } = req.body;

        // const user = await User.findOne({ email })

        const user = await User.findOne({ email })

        // if (!user || !(await user.matchesPassword(password))) { 
        //     throw new Error(" Email or Password is Incorrect")
        // }
        if ( user.length < 0) { 
            throw new Error('user not found')
        }

        if (!(user.matchesPassword)){ 
            throw new Error('password not matching')
        }

        logIn(req, user.id)

        res.status(201).json(user)

    } catch(error) { 
        res.status(500).json({ 
            message: "Something went wrong try again", 
            error
        })
    }
}

async function logout(req, res) { 
    try{
        await logOut(req, res) 
        res.status(201).json('successfully logged out')
    }catch(error){
        res.status(500).json({ 
            message: 'Something went wrong try again', error
        }) 

    }
}

async function home(req, res) { 
    try{ 
        const user = await User.findbyId(req.session.userId)
        res.status(201).json(user)
    }catch(error){ 
        res.status(500).json({ 
            message: 'Something went wrong try again', error
        })
    }
}

module.exports = { register, login, logout, home }