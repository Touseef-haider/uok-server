const Router = require("express").Router();
const userRoutes = require("./appRoutes/user");
const programRoutes = require("./appRoutes/program");
const courseRoutes = require("./appRoutes/course");

const { login, register } = require("./controllers/user");

Router.post("/login", login);
Router.post("/register", register);

Router.use("/users", userRoutes);
Router.use("/programs", programRoutes);
Router.use("/courses", courseRoutes);

module.exports = Router;
