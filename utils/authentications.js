const bcrypt = require("bcryptjs");

const hashPassword = (password) =>
  new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          reject(error);
        }
        resolve(hash);
      });
    });
  });

// eslint-disable-next-line
const verifyPassword = async (passwordAttempt, hashedPassword) =>
  await bcrypt.compare(passwordAttempt, hashedPassword);

module.exports = {
  hashPassword,
  verifyPassword,
};
