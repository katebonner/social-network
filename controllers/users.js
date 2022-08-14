const { User, Thought } = require("../models");

const userController = {
  // GET ALL USERS
    async getUsers(req, res) {
    try {
        const userData = await User.find({})
        .populate({
            path: "friends",
            select: "-__v",
          })
          .select("-__v")
          .sort({ _id: -1 });
        
        res.status(200).json(userData)
    }
    catch (err) {
        res.status(500).json(err);
    }
  },

  // GET USER BY ID
   async getUserById({ params }, res) {
      try {
        const userData = await User.findOne({ _id: params.id })
            .populate({
            path: "thoughts",
            select: "-__v"
            })
            .populate({
            path: "friends",
            select: "-__v"
            })
            .select("-__v");
        
        if (!userData){
            res.status(404).json({message: 'no user found with this id'});
            return;
        }
        res.status(200).json(userData);
      }
      catch (err) {
          res.status(500).json(err);
      }
  },

  // CREATE USER 
   async createUser({ body }, res) {
    try {
        const userData = await User.create(body);
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }  
  },

  // UPDATE USER BY ID
  async updateUser({ params, body }, res) {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: params.id }, 
            body, 
            {new: true, runValidators: true}
            );
        if (!userData) {
            res.status(404).json({ message: 'no user found with this id'});
            return;
        }
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }  
  },

  // DELETE USER
  async deleteUser({ params }, res) {
    try {
        const userData = await User.findOneAndDelete({ _id: params.id })

        if (!userData){
            res.status(404).json({ message: 'no user found with this id'})
        }
        res.status(200).json(userData);
        return Thought.deleteMany({ _id: { $in: userData.thoughts } });
    }
    catch (err) {
        res.status(500).json(err);
    } 
  },

  // ADD FRIEND
  async addFriend({ params }, res) {
    try {
        const userData = await User.findOneAndUpdate(
            {_id: params.userId},
            {$push: { friends: params.friendId }},
            {new: true, runValidators: true }
        )
        if (!userData){
            res.status(404).json({message: 'no user found with this id'});
            return;
        }
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
  },

  // DELETE FRIEND
  async deleteFriend({ params }, res) {
    try {
        const userData = await User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
        if (!userData){
            res.status(404).json({message: 'no user found with this id'});
            return;
        }
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
  },
};

module.exports = userController;