const Router = require("express").Router();
const userRoutes = require("./appRoutes/user");

Router.use("/user", userRoutes);

module.exports = Router;
