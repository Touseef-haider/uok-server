const roleAuth = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(createError(403, "Forbidden"));
  }
  next();
};

module.exports = roleAuth;
