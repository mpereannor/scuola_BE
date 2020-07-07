const { User } = require("../../user/models/user-models");

const {
  registerSchema,
  loginSchema,
} = require("../middlewares/auth-validation");

const { logIn, logOut } = require("../middlewares/auth-middleware");
const { BadRequest } = require("../../authentication/middlewares/auth-errors");

const ObjectId = require('mongoose').Types.ObjectId;

async function register(req, res) {
  try {
    await registerSchema.validateAsync(req.body, { abortEarly: false });

    const { username, fullname, email, password } = req.body;

    const found = await User.exists({ email });

    if (found) {
      throw new BadRequest("Incorrect email or password");
    }

    const user = await User.create({
      username,
      fullname,
      email,
      password,
    });

    res.status(201).json(user);

    logIn(req, user.id);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong try again",
      error,
    });
  }
}

async function login(req, res) {
  try {
    await loginSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user.length === 0) {
      throw new BadRequest("Incorrect email or password");
    }

    if (!user.matchesPassword) {
      throw new BadRequest("Incorrect email or password");
    }

    logIn(req, user.id);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong try again",
      error,
    });
  }
}

async function logout(req, res) {
  try {
    await logOut(req, res);
    res.status(201).json("successfully logged out");
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong try again",
      error,
    });
  }
}

async function home(req, res) {
  try {
    const user = await User.findById(req.session.userId);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong try again",
      error,
    });
  }
}

async function updatePosition(req, res) { 
    const options = ['guest', 'admin', 'student', 'tutor'];

    const { id } = req.params;
    
    try{
        const { position } = req.body;
        if (options.includes(position) === false){
            throw new BadRequest('Incorrect position')
        }
        const updatedPosition = await User.findOneAndUpdate({_id: ObjectId(id)},{$set:{position: position}},
        {new: true})
    res.status(201).json(updatedPosition);
    }catch (error) {
        res.status(500).json({
          message: "Something went wrong try again",
          error,
        });
      }
}


 module.exports = { register, login, logout, home, updatePosition };
