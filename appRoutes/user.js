const route = require("express").Router();
const requireAuth = require("../middlewares/auth");
const roleAuth = require("../middlewares/role");
const { getUsers } = require("../controllers/user");

route.get("/", [requireAuth, roleAuth("admin")], getUsers);

module.exports = route;
