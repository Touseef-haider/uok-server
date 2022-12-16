const Course = require("../models/program");

exports.addCourse = async (req, res, next) => {
  try {
    const program = new Course(req.body);
    await program.save();
    return res.status(200).json({
      message: "Course added successfully",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const users = await Course.find({});
    res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    await Course.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json({
      message: "Course updated",
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    await Course.findByIdAndUpdate(
      { _id: req.params.id },
      { is_deleted: true }
    );
    res.status(200).json({
      message: "Course deleted",
    });
  } catch (error) {
    return next(error);
  }
};
