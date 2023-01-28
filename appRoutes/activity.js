const Router = require("express").Router();
const requireAuth = require("../middlewares/auth");
const {
  addActivity,
  getActivities,
  updateActivity,
  getParticularActivity,
  deleteActivity,
} = require("../controllers/activity");

Router.post("/", [requireAuth], addActivity);
Router.get("/", [requireAuth], getActivities);
Router.get("/:id", [requireAuth], getParticularActivity);
Router.put("/:id", [requireAuth], updateActivity);
Router.delete("/:id", [requireAuth], deleteActivity);

module.exports = Router;
