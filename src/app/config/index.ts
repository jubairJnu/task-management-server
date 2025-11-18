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
  redis_api:
    process.env.NODE_MODULE === "production"
      ? process.env.REDIS_URL
      : process.env.REDIS_URL_LOCAL,
  redis_password: process.env.REDIS_PASSWORD,
  fronted_url:
    process.env.NODE_MODULE === "development"
      ? process.env.FRONTEND_URL_DEV
      : process.env.FRONTEND_URL_PROD,
  mail_user: process.env.MAIL_USER,
  mail_secret: process.env.MAIL_SECRET,

  jwt: {
    access_secret: process.env.ACCESS_TOKEN,
    refresh_secret: process.env.REFRESH_TOKEN,
    expire_in: process.env.EXPIRES_IN,
    expire_in_back: process.env.EXPIRES_IN_BACK,
    refres_expire_in: process.env.REFRESH_EXPIRES_IN,
  },
  sms: {
    api_key: process.env.SMS_APIKEY,
    sender_id: process.env.SMS_SENDERID,
    api_url: process.env.SMS_APIURL,
  },
  backend_base_url: process.env.BACKEND_URL,
  frontend_url:
    process.env.NODE_ENV === "development"
      ? process.env.FRONTEDN_URL_DEV
      : process.env.FRONTEDN_URL_PROD,
  node_env: process.env.NODE_ENV,
  aws: {
    s3: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
      region: process.env.S3_BUCKET_REGION,
      bucketName: process.env.BUCKET_NAME,
      maxUploadSize: process.env.MAX_FILE_SIZE,
    },
  },
};
