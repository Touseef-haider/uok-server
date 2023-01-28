const createHttpError = require("http-errors");
const Activity = require("../models/activity");

exports.addActivity = async (req, res, next) => {
  try {
    const activity = new Activity({ ...req.body });
    await activity.save();
    return res.status(200).json({
      message: "Activity added successfully",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find({});
    res.status(200).json(activities);
  } catch (error) {
    return next(error);
  }
};

exports.updateActivity = async (req, res, next) => {
  try {
    await Activity.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json({
      message: "Activity updated",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getParticularActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findById({ _id: req.params.id });
    return res.status(200).json(activity);
  } catch (err) {
    return next(err);
  }
};

exports.updateParticularActivity = async (req, res, next) => {
  try {
    const ActivityExistWithTheEmail = await Activity.findOne({
      email: req.body.email,
    });
    if (ActivityExistWithTheEmail) {
      return next(
        createHttpError(403, "Activity already exist with this email address")
      );
    }

    await Activity.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    );

    return res.status(200).json({
      message: "Activity updated",
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteActivity = async (req, res, next) => {
  try {
    await Activity.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "Activity deleted",
    });
  } catch (error) {
    return next(error);
  }
};
