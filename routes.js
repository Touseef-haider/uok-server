const Router = require("express").Router();
const userRoutes = require("./appRoutes/user");
const categoryRoutes = require("./appRoutes/category");
const activityRoutes = require("./appRoutes/activity");
const scholarshipRoutes = require("./appRoutes/scholarship");

const { login, register } = require("./controllers/user");

Router.post("/login", login);
Router.post("/register", register);
Router.use("/users", userRoutes);
Router.use("/categories", categoryRoutes);
Router.use("/activities", activityRoutes);
Router.use("/scholarships", scholarshipRoutes);

module.exports = Router;
