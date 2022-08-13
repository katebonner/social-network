const { Schema, model, Types } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

//REACTION MODEL
const ReactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
  
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280
      },
  
      username: {
        type: String,
        required: true
      },
  
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
      },
    },
    {
      toJSON: {
        getters: true
      },
      id: false
    }
  );

//THOUGHT MODEL
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "thought is required",
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// CREATING VIRTUAL REACTION COUNT
ThoughtSchema.virtual("reactionCount").get(()=> {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;