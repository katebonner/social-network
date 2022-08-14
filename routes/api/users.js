const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/users");

// /api/users
router.route("/")
    .get(getUsers)
    .post(createUser);

// /api/users/:id
router.route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
