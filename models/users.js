const { Schema, model } = require("mongoose");

//USER MODEL
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: "username is required"
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: "email is required",
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    },
    password: {
        type: String,
        trim: true,
        required: "password is required"
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought"
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
    ],
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// CREATING VIRTUAL FRIEND COUNT
UserSchema.virtual("friendCount").get(() => {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
