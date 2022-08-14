const { User, Thought } = require("../models");

const thoughtController = {
  // GET ALL THOUGHTS
  async getThoughts(req, res) {
    try {
        const thoughtData = await Thought.find({})
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .select("-__v")
            .sort({_id: -1});
        
        res.status(200).json(thoughtData);
    }
    catch (err) {
        res.status(500).json(err);
    }
  },

  // GET THOUGHT BY ID
  async getThoughtById({ params }, res) {
    try {
        const thoughtData = await Thought.findOne({_id: params.id})
            .populate({
                path: "reactions",
                select: "-__v"
            })
            .select("-__v")
        
        if (!thoughtData){
            res.status(404).json({ message: 'no thought found with this id'});
        }
        res.status(200).json(thoughtData);
    }
    catch (err) {
        res.status(500).json(err);
    }
  },

  // CREATE THOUGHT AND PUSH TO USER THOUGHTS ARRAY
  async createThought({ params, body }, res) {
    try {
        const thoughtData = await Thought.create(body)
        const userData = await User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {thoughts: thoughtData._id}},
            {new: true}
            );
        if (!userData) {
            res.status(404).json({message: 'no user associated with this thought'});
            return;
        }
        res.status(200).json({thoughtData, userData});
    }
    catch (err) {
        res.status(500).json(err);
    }
  },

  // UPDATE THOUGHT BY ID
  async updateThought({ params, body }, res) {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, runValidators: true}
            );
        if (!thoughtData) {
            res.status(404).json({message: 'no thought found with this id'});
            return;
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
  },

  // DELETE THOUGHT
  async deleteThought({ params }, res) {
    try {
        const thoughtData = await Thought.findOneAndDelete({ _id: params.id});
        if (!thoughtData){
            res.status(404).json({message: 'no thought found with this id'});
            return;
        }
        const userData = await User.findOneAndUpdate(
            {thoughts: params.id},
            {$pull: {thoughts: params.id}},
            {new:true}
        );
        if (!userData){
            res.status(404).json({message: 'no user found with this thought'});
        }
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
  },

  // ADD REACTION
  async addReaction({ params, body }, res) {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        );
        if (!thoughtData){
            res.status(404).json({message: 'no thought associated with this reaction'});
            return;
        }
        res.status(200).json(thoughtData);
    }
    catch (err) {
        res.status(500).json(err);
    }
  },

  // DELETE REACTION
  async deleteReaction({ params }, res) {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        );
        if (!thoughtData){
            res.status(404).json({message: 'no thought found with this reaction'});
            return;
        }
        res.status(200).json(thoughtData);
    }
    catch (err) {
        res.status(500).json(err);
    }
  }
};

module.exports = thoughtController;