import { configDotenv } from "dotenv";

configDotenv();

const _config = {
  port: process.env.PORT || 3000,
  dbURI: process.env.DBURI || "mongodb://localhost:27017/test",
  nodeENV: process.env.NODE_ENV,
  accessTokenSecret: process.env.SECRET || "secret",
  refreshTokenSecret: process.env.SECRET || "secret",
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRATION || "1h",
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRATION || "1h",
  SMTPHost: process.env.SMTP_HOST,
  SMTPPort: process.env.SMTP_PORT,
  SMTPUser: process.env.SMTP_USER,
  SMTPPass: process.env.SMTP_PASS,
  SMTPEmail: process.env.SMTP_EMAIL,
  SMTPService: process.env.SMTP_SERVICE,
};

const getConfig = {
  get: (key) => {
    return _config[key];
  },
};

export { getConfig };
