const { verifyAccessToken } = require("../utils/jwtHelper");
const createError = require("http-errors");

const requireAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return next(createError(401, "Unauthorized"));
  }
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = requireAuth;
