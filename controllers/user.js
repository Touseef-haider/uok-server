const createHttpError = require("http-errors");
const User = require("../models/user");
const { verifyPassword, hashPassword } = require("../utils/authentications");
const { signAccessToken } = require("../utils/jwt");

exports.register = async (req, res, next) => {
  try {
    const { email } = req.body;

    const userExist = await User.findOne({ email, is_deleted: false });
    if (userExist) {
      return next(createHttpError(403, "User already exists with this email"));
    }
    const hashedPassword = await hashPassword(req.body.password);

    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    return res.status(200).json({
      message: "User added successfully",
    });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email, is_deleted: false });

    if (!userExist) {
      return next(createHttpError(401, "User does not exists with this email"));
    }

    const isValidPassword = await verifyPassword(password, userExist.password);

    if (!isValidPassword) {
      return next(createHttpError(401, "Please check your credentials"));
    }

    const accessToken = await signAccessToken({ ...userExist });

    return res.status(200).json({
      access_token: accessToken,
      user: userExist,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json({
      message: "User updated",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getParticularUser = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

exports.updateParticularUser = async (req, res, next) => {
  try {
    const userExistWithTheEmail = await User.findOne({ email: req.body.email });
    if (userExistWithTheEmail) {
      return next(
        createHttpError(403, "User already exist with this email address")
      );
    }

    await User.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    );

    return res.status(200).json({
      message: "User updated",
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    return next(error);
  }
};
