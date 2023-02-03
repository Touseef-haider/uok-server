const Feedback = require("../models/feedback");

exports.addFeedback = async (req, res, next) => {
  try {
    const feedback = new Feedback({ ...req.body });
    await feedback.save();
    return res.status(200).json({
      message: "feedback added successfully",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getFeedbacks = async (req, res, next) => {
  try {
    const activities = await Feedback.find({}).sort({ date: -1 });
    res.status(200).json(activities);
  } catch (error) {
    return next(error);
  }
};

exports.getFeedbacksByMonth = async (req, res, next) => {
  try {
    const feedbackByMonths = await Feedback.aggregate([
      { $match: { date: { $exists: true } } },
      {
        $project: {
          month: { $month: "$date" },
          message: 1,
        },
      },
      { $match: { month: parseInt(req.query.month) } },
    ]);
    return res.status(200).json(feedbackByMonths);
  } catch (error) {
    return next(error);
  }
};

exports.updateFeedback = async (req, res, next) => {
  try {
    await Feedback.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json({
      message: "feedback updated",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getParticularFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById({ _id: req.params.id });
    return res.status(200).json(feedback);
  } catch (err) {
    return next(err);
  }
};

exports.updateParticularFeedback = async (req, res, next) => {
  try {
    await Feedback.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    );

    return res.status(200).json({
      message: "feedback updated",
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteFeedback = async (req, res, next) => {
  try {
    await Feedback.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "feedback deleted",
    });
  } catch (error) {
    return next(error);
  }
};
