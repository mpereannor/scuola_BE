require('dotenv').config()
const { User } = require("../../user/models/user-models");
const jwt = require("jsonwebtoken");
const { BadRequest, Unauthorized } = require("../middlewares/auth-errors");


const {
  registerSchema,
  loginSchema,
} = require("../middlewares/auth-validation");

let refreshTokens = [];
const generateAccessToken = user =>  jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30000s'});
// const generateRefreshToken = user =>  jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET);



async function createToken(req, res) { 
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.status(401);
    if(!refreshTokens.includes(refreshToken)) return res.status(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, username) => { 
        if(err) return res.status(403);
        const accessToken = generateAccessToken({username});
        res.json(accessToken)
    })
}

async function logout(req, res) {
    const refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
}

async function register(req, res) {
  try {
    await registerSchema.validateAsync(req.body, { abortEarly: false });

    const { username, fullname, email, password } = req.body;

    const found = await User.exists({ email });

    if (found) {
        try{
            const userData = await User.findOne({email})
            const token = generateAccessToken({username});
            res.status(201).json({
                message: `Welcome ${username}`,
                token,
                user: userData
            });
         } catch (error){ 
             res.status(500).json(`Account registered, but error retrieving user details`)
        }
    }

    const user = await User.create({
      username,
      fullname,
      email,
      password,
    });

    res.status(201).json(
        {
            message: `Account successfully registered, Welcome ${username}`,
            user
        });
  } catch (error) {
    res.status(500).json({
      message: `Unable to register account, try again${error.message}`,
    });
  }
}

async function login(req, res) {
  try {
    await loginSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const { username, email } =  req.body;


    const user = await User.findOne({ email });

    if (user.length === 0) {
        res.status(401).json({ 
            message: `Email or password is incorrect`
        })
    }

    if (!user.matchesPassword) {
        res.status(401).json({
            message: `Email or password is incorrect`
        })
    }

    const token = generateAccessToken({username});
    // const accessToken = generateAccessToken({username});
    // const refreshToken = generateRefreshToken({username});
    // refreshTokens.push(refreshToken);
    res.status(200).json({
        message: `Welcome back ${user.username}!`,
        token,
        user
    });
    // res.status(201).json({accessToken,refreshToken});
  } catch (error) {
    res.status(500).json({
      message: `Unable to login ${error.message}`,
    });
  }
}


const authenticateToken = ( req, res, next) => { 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null) return res.status(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { 
        if(err) return res.status(403);
        req.user = user
        next()
    })
}



//an example of userAuthorization 
// app.get('/posts', authenticateToken, (req, res) => {
//     res.json(posts.filter(post => post.username === req.user.name))
//   })
  
//   function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401)
  
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//       console.log(err)
//       if (err) return res.sendStatus(403)
//       req.user = user
//       next()
//     })
//   }
  

module.exports = {
     register,
      login, 
      createToken,
      logout, 
      authenticateToken 
    //   home, 
    //   updatePosition,
    };
