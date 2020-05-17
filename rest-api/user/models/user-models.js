const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    fullname: { 
        type: String,
        required: true,
     },
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    position: {
        type: String,
        required: true,
    },
    schoolId: { 
        type: String,
        required: true,
        unique: true
    },
    photoUrl: {
        type: String
    },
    location: {
        type: String
    },
})

module.exports = mongoose.model('User', userSchema)