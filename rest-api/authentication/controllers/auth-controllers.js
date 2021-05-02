require('dotenv').config()
const { User } = require("../../user/models/user-models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')


// let refreshTokens = [];
const generateAccessToken = user =>  jwt.sign({user}, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '1h'});
// const generateRefreshToken = user =>  jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET);

const register = async (req, res) => {
    try {
      const newUser = await User.create({
          username: req.body.username,
          fullname: req.body.fullname,
          email: req.body.email,
          password: req.body.password,
          position: req.body.position
      });
  
      if (newUser) {
        try {
          const fullUserDetails = await User.findOne({
            email: newUser.email,
          });
          const token = generateAccessToken(newUser.id);
          res.status(201).json({
            message: `Welcome ${newUser.username}`,
            token,
            user: {
              id: fullUserDetails.id,
              username: fullUserDetails.username,
              fullname: fullUserDetails.fullname,
              email: fullUserDetails.email,
              position: fullUserDetails.postion,
              password: fullUserDetails.password
            },
          });
        } catch (error) {
          res
            .status(500)
            .json(
              'Account registered, but error retrieving coach or student details',
            );
        }
      }
    } catch (error) {
      res.status(500).json({
        message: `Unable to register account ${error.message}`,
      });
    }
  };
  

const login = async (req, res) => {
const { username, email, password } = req.body;

try {
    const user = await User.findOne({ email  });
    console.log(user)
    console.log(bcrypt.compareSync(password, user.password))
    if (user && bcrypt.compareSync(password, user.password)) {
    const token = generateAccessToken(user.id);
    res.status(200).json({
        message: `Welcome Back ${user.username}!`,
        token,
        user: {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        },
    });
    } else {
    res
        .status(401)
        .json({ message: 'Email or password is incorrect' });
    }
} catch (error) {
    res
    .status(500)
    .json({ message: `Unable to login ${error.message}` });
}
};




module.exports = {
     register,
      login, 

    };
