const Joi = require("@hapi/joi");

const { BCRYPT_MAX_BYTES, BCRYPT_WORK_FACTOR, PASSWORD_RESET_BYTES } = require('../../../config/keys')

// const id = Joi.ObjectId().required();
const username = Joi.string().min(3).max(128).trim().required();
const fullname = Joi.string().min(3).max(128).trim().required();
const email = Joi.string().email().min(8).max(254).lowercase().trim().required();
const password = Joi.string().min(8).max(128).required();
const passwordConfirmation = Joi.valid(Joi.ref("password")).required();


const registerSchema = Joi.object({ 
    username, 
    fullname,
    email,
    password,
    passwordConfirmation
})

const loginSchema =  Joi.object({ 
    email, 
    password
})

module.exports = { registerSchema, loginSchema }