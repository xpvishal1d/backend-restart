
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import { url } from 'inspector';



cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});



const uploadOnCLoudnary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload the file on cloudinary
      const response = await cloudinary.uploader.upload(localFilePath , {resource_type: "auto"
         })
         // file has uploaded successfull
         console.log("file is uploaded on cloudinary" , response.url);
         return response
    } catch (error) {
        // error part
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the opload opration failed..
        return null;

    }
}


export {uploadOnCLoudnary};
