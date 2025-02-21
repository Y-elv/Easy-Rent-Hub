import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

console.log(
  "Cloudinary Config:",
  cloudinary.config().cloud_name,
  cloudinary.config().api_key,
  cloudinary.config().api_secret
);
export default cloudinary;
