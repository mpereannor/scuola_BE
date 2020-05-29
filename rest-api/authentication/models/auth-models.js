const { Schema, model } = require("mongoose");

const passwordResetSchema = new Schema(
    { 
        userId: { 
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    token: String,
    expiredAt: Date
    }, { 
        timestamps: { createdAt: true, updatedAt: false }
    }
)

const PasswordReset = model("PasswordReset", passwordResetSchema)

module.exports = { PasswordReset }