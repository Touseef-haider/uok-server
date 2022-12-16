const Program = require("../models/program");

exports.addProgram = async (req, res, next) => {
  try {
    const program = new Program(req.body);
    await program.save();
    return res.status(200).json({
      message: "Program added successfully",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getPrograms = async (req, res, next) => {
  try {
    const users = await Program.find({});
    res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

exports.updateProgram = async (req, res, next) => {
  try {
    await Program.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json({
      message: "Program updated",
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteProgram = async (req, res, next) => {
  try {
    await Program.findByIdAndUpdate(
      { _id: req.params.id },
      { is_deleted: true }
    );
    res.status(200).json({
      message: "Program deleted",
    });
  } catch (error) {
    return next(error);
  }
};
