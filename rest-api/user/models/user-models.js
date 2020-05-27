const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    // position: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);


const profileSchema  = new Schema({ 
    photoUrl: { 
        type: String,
    }, 
    location: { 
        type: String,
    },
    age: { 
        type: String
    },
    bio: { 
        type: String
    }
})

const Profile = model('Profile', profileSchema)
const User = model('User', userSchema)

module.exports ={ User, Profile }