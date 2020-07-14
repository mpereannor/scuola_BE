const { Schema, model } = require("mongoose");

const { compare, hash } = require("bcryptjs");

const { BCRYPT_WORK_FACTOR } = require("../../../config/keys");

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true
    },
    password: {
      type: String
    },
    position: {
      type: String,
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
