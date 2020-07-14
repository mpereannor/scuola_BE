const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  image: {
    type: String
  },
  age: {
    type: Number
  },
  gender: { 
      type: String
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
});

const maleImage = 'https://i.ibb.co/gSbgf9K/male-placeholder.jpg';
const femaleImage= 'https://i.ibb.co/dKx0vDS/woman-placeholder.jpg'

profileSchema.pre('save', function(next){ 
    if (this.gender === 'male' ){ 
        this.image = maleImage
    } else{ 
        this.image = femaleImage
    }

    next()
})

const Profile = model("Profile", profileSchema);

module.exports = { Profile };
