/* eslint-disable no-undef */
const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const config = require("../config");

module.exports = {
  signAccessToken: (payload) =>
    new Promise((resolve, reject) => {
      const secret = config.jwt.secret;
      const options = {
        expiresIn: config.jwt.expiry,
        issuer: "uok server",
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    }),
  verifyAccessToken: (access_token) =>
    JWT.verify(access_token, config.jwt.secret, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        throw createError(401, message);
      }
      return {
        ...payload._doc,
      };
    }),

  signRefreshToken: (profile) =>
    new Promise((resolve, reject) => {
      const payload = {
        ...profile,
      };
      const secret = config.jwt.secret;
      const options = {
        expiresIn: config.jwt.refreshExpiry,
        issuer: "uok server",
      };
      return JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(createError.InternalServerError(err.message));
        }
        resolve(token);
      });
    }),
};
