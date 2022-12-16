const Router = require("express").Router();
const requireAuth = require("../middlewares/auth");
const {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/course");

Router.post("/", [requireAuth], addCourse);
Router.get("/", [requireAuth], getCourses);
Router.put("/:id", [requireAuth], updateCourse);
Router.delete("/:id", [requireAuth], deleteCourse);

module.exports = Router;
