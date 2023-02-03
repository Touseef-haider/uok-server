const Router = require("express").Router();
const requireAuth = require("../middlewares/auth");
const {
  addFeedback,
  getFeedbacks,
  updateFeedback,
  getParticularFeedback,
  getFeedbacksByMonth,
  deleteFeedback,
} = require("../controllers/feedback");

Router.post("/", [requireAuth], addFeedback);
Router.get("/", [requireAuth], getFeedbacks);
Router.get("/byMonth", [requireAuth], getFeedbacksByMonth);
Router.get("/:id", [requireAuth], getParticularFeedback);
Router.put("/:id", [requireAuth], updateFeedback);
Router.delete("/:id", [requireAuth], deleteFeedback);

module.exports = Router;
