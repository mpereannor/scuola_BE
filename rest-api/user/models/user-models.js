const { Schema, model } = require("mongoose");
const { compare, hash } = require("bcryptjs");
const validator = require('validator')
const { BCRYPT_WORK_FACTOR } = require("../../../config/keys");

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      validate(value){ 
          if (!validator.isEmail(value)){ 
              throw new Error('Email is invalid')
          }
      },
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
      validate(value){ 
          if(!value.toLowercase.includes('password')){ 
              throw new Error('Password cannot contain "password"')
          }
      }
    },
    position: {
      type: String,
      enum: ['guest', 'admin', 'tutor', 'student'],
      default: 'guest'
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(this.password, BCRYPT_WORK_FACTOR);
  }
});

//userSchema methods
userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = { User };
