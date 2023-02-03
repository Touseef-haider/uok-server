module.exports = {
  port: process.env.PORT || 8081,
  db: {
    prod: process.env.DATABASE_URL_PROD,
    dev: process.env.DATABASE_URL_DEV,
    stag: process.env.DATABASE_URL_STAG,
    local: process.env.DATABASE_URL_LOCAL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET || "development_secret",
    refreshSecret: process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
    expiry: "7d",
    refreshExpiry: "2d",
  },
  NODE_ENV: process.env.NODE_ENV || "development",
};
