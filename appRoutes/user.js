const Router = require("express").Router();
const requireAuth = require("../middlewares/auth");
const { getUsers, updateUser: updateProfile } = require("../controllers/user");

Router.get("/", [requireAuth], getUsers);
Router.put("/:id", [requireAuth], updateProfile);
Router.delete("/:id", [requireAuth], getUsers);

module.exports = Router;
