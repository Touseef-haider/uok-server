const Router = require("express").Router();
const userRoutes = require("./appRoutes/user");
const categoryRoutes = require("./appRoutes/category");
const activityRoutes = require("./appRoutes/activity");
const scholarshipRoutes = require("./appRoutes/scholarship");
const feedbackRoutes = require("./appRoutes/feedback");
const { login, register } = require("./controllers/user");
const { uploadFile } = require("./utils/upload");
const upload = require("./middlewares/multer");

Router.post("/login", login);
Router.post("/register", register);
Router.use("/users", userRoutes);
Router.use("/categories", categoryRoutes);
Router.use("/activities", activityRoutes);
Router.use("/scholarships", scholarshipRoutes);
Router.use("/feedbacks", feedbackRoutes);
Router.post("/upload",upload.single("file"), uploadFile)

module.exports = Router;
