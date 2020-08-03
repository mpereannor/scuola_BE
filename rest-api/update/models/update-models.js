const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const updateSchema = new Schema({ 
    update:{ 
        type: String
    },
    upvote: { 
        type: Number,
        default: 0
    },
    downvote: { 
        type: Number,
        default: 0
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
},
{ timestamps: true});

const Update = model('Update',  updateSchema);

module.exports = { Update }
