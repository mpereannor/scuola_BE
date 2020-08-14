const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const { compare, hash } = require("bcryptjs");
const validator = require("validator");
const { BCRYPT_WORK_FACTOR } = require("../../../config/keys");

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
      //   validate(value){
      //       if(!value.toLowercase.includes('password')){
      //           throw new Error('Password cannot contain "password"')
      //       }
      //   }
    },
    position: {
      type: String,
      enum: ["guest", "admin", "tutor", "student"],
      default: "guest",
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  { timestamps: true }
);

const profileSchema = new Schema(
  {
    image: {
      type: String,
    },
    avatar: { 
        type: Buffer
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    location: {
      type: String,
    },
    bio: {
      type: String,
    },
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

const maleImage = "https://i.ibb.co/gSbgf9K/male-placeholder.jpg";
const femaleImage = "https://i.ibb.co/dKx0vDS/woman-placeholder.jpg";

profileSchema.pre("save", function (next) {
  if (this.gender === "male") {
    this.image = maleImage;
  } else {
    this.image = femaleImage;
  }
  next();
});

const User = model("User", userSchema);
const Profile = model("Profile", profileSchema);

module.exports = { User, Profile };
