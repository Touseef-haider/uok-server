const createHttpError = require("http-errors");

const roleAuth = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(createHttpError(403, "Forbidden"));
  }
  next();
};

module.exports = roleAuth;
