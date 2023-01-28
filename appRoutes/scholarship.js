const Router = require("express").Router();
const requireAuth = require("../middlewares/auth");
const {
  addScholarship,
  getParticularScholarship,
  getScholarships,
  updateParticularScholarship,
  deleteScholarship,
} = require("../controllers/scholarship");

Router.post("/", [requireAuth], addScholarship);
Router.get("/", [requireAuth], getScholarships);
Router.get("/:id", [requireAuth], getParticularScholarship);
Router.put("/:id", [requireAuth], updateParticularScholarship);
Router.delete("/:id", [requireAuth], deleteScholarship);

module.exports = Router;
