const Router = require("express").Router();
const userRoutes = require("./appRoutes/user");

const { login, addUser: register } = require("./controllers/user");

Router.post("/login", login);
Router.post("/register", register);

Router.use("/user", userRoutes);

module.exports = Router;
