const Router = require("express").Router();
const requireAuth = require("../middlewares/auth");
const {
  getUsers,
  updateUser: updateProfile,
  deleteUser,
} = require("../controllers/user");

Router.get("/", [requireAuth], getUsers);
Router.put("/:id", [requireAuth], updateProfile);
Router.delete("/:id", [requireAuth], deleteUser);

module.exports = Router;
