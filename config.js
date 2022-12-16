module.exports = {
  port: process.env.PORT || 8081,
  db: {
    prod: process.env.DATABASE_URL_PROD,
    test: process.env.DATABASE_URL_DEV,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || "development_secret",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "refresh_secret",
    expiry: "7d",
    refreshExpiry: "2d",
  },
  NODE_ENV: process.env.NODE_ENV || "development",
};
