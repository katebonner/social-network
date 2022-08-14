const { Schema, model } = require("mongoose");

//USER MODEL
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
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
UserSchema.virtual("friendCount").get(function(){
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
