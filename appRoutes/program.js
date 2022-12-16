const Router = require("express").Router();
const requireAuth = require("../middlewares/auth");
const {
  addProgram,
  getPrograms,
  updateProgram,
  deleteProgram,
} = require("../controllers/program");

Router.post("/", [requireAuth], addProgram);
Router.get("/", [requireAuth], getPrograms);
Router.put("/:id", [requireAuth], updateProgram);
Router.delete("/:id", [requireAuth], deleteProgram);

module.exports = Router;
