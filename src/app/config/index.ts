import dotenv from "dotenv";

dotenv.config();

export default {
  env: process.env.NODE_MODULE,
  port: process.env.PORT,
  solt: process.env.SOLT_ROUND,
  database_url:
    process.env.NODE_MODULE === "production"
      ? process.env.DATABASE_URL_PROD
      : process.env.DATABASE_URL,

  fronted_url:
    process.env.NODE_MODULE === "development"
      ? process.env.FRONTEND_URL_DEV
      : process.env.FRONTEND_URL_PROD,

  jwt: {
    access_secret: process.env.ACCESS_TOKEN,
    refresh_secret: process.env.REFRESH_TOKEN,
    expire_in: process.env.EXPIRES_IN,
    expire_in_back: process.env.EXPIRES_IN_BACK,
    refres_expire_in: process.env.REFRESH_EXPIRES_IN,
  },

  backend_base_url: process.env.BACKEND_URL,

  node_env: process.env.NODE_ENV,
};
