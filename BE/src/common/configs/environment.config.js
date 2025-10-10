import dotenv from "dotenv";
dotenv.config();

export const {
  PORT,
  HOST,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  DB_URI,
  CLIENT_URL,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;
