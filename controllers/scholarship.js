const createHttpError = require("http-errors");
const Scholarship = require("../models/scholarship");

exports.addScholarship = async (req, res, next) => {
  try {
    const scholarship = new Scholarship({ ...req.body });
    await scholarship.save();
    return res.status(200).json({
      message: "Scholarship added successfully",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getScholarships = async (req, res, next) => {
  try {
    const activities = await Scholarship.find({});
    res.status(200).json(activities);
  } catch (error) {
    return next(error);
  }
};

exports.updateScholarship = async (req, res, next) => {
  try {
    await Scholarship.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json({
      message: "Scholarship updated",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getParticularScholarship = async (req, res, next) => {
  try {
    const scholarship = await Scholarship.findById({ _id: req.params.id });
    return res.status(200).json(scholarship);
  } catch (err) {
    return next(err);
  }
};

exports.updateParticularScholarship = async (req, res, next) => {
  try {
    const ScholarshipExistWithTheEmail = await Scholarship.findOne({
      email: req.body.email,
    });
    if (ScholarshipExistWithTheEmail) {
      return next(
        createHttpError(
          403,
          "Scholarship already exist with this email address"
        )
      );
    }

    await Scholarship.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    );

    return res.status(200).json({
      message: "Scholarship updated",
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteScholarship = async (req, res, next) => {
  try {
    await Scholarship.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "Scholarship deleted",
    });
  } catch (error) {
    return next(error);
  }
};
