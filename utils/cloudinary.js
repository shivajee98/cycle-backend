import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  });
  

const uploadBase64ToCloudinary = async (base64String) => {
    try {
        const response = await cloudinary.uploader.upload(base64String, {
            resource_type: "image"
        });
        return response.secure_url; // Return the URL of the uploaded image
    } catch (error) {
        console.error("Error uploading base64 to Cloudinary:", error);
        return null;
    }
};

export {
    uploadBase64ToCloudinary
}