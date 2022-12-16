const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: (payload) =>
    new Promise((resolve, reject) => {
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1d",
        issuer: "abc.com",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    }),
  // eslint-disable-next-line
  verifyAccessToken: (access_token) =>
    JWT.verify(
      access_token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          const message =
            err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
          throw createError(401, message);
        }
        return {
          // eslint-disable-next-line
          ...payload._doc,
        };
      }
    ),

  signRefreshToken: (profile) =>
    new Promise((resolve, reject) => {
      const payload = {
        ...profile,
      };
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "30d",
        issuer: "abc.com",
      };
      return JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(createError.InternalServerError(err.message));
        }
        resolve(token);
      });
    }),
};
