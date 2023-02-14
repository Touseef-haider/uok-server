const { verifyAccessToken } = require("../utils/jwt");
const createError = require("http-errors");

const requireAuth = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return next(createError(401, "Unauthorized"));
  }
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = requireAuth;
