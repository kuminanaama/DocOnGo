import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

export const symptomImage = multer({
    storage: new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "DocOnGo/symptom-images",
      },
    }),
  });


  export const responseImage = multer({
    storage : new CloudinaryStorage({
      cloudinary,
      params:{
        folder:"DocOnGo/response-images"
      },
    }),
  });