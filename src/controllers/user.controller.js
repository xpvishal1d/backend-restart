import { response } from "express";
import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCLoudnary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req,res) => {


 const {fullName , email , username , password} =  req.body
console.log("email :" , email);

 if (
    [fullName , email , username , password].some((field) => field?.trim === "" )
 ) {
     throw new ApiError(400 , "All fields are required")
 }

 const existedUser = User.findOne({
    $or :[{ username }, { email }]
 })

 if (existedUser) {
    throw new ApiError(409 , " User with this email and username Already Exists")
 }

 const avatarLocalPath =  req.files?.avatar[0]?.path;
 const coverImageLocalPath =  req.files?.coverImage[0]?.path;

 if (!avatarLocalPath) {
    throw new ApiError(400 , "Avatar File is required")
 }

 const avatar =  await uploadOnCLoudnary(avatarLocalPath)
 const coverImage =  await uploadOnCLoudnary(coverImageLocalPath)

 if (!avatar) {
    throw new ApiError(400 , "Avatar File is required")
 }

 const user = await User.create({
    fullName,
    avatar : avatar.url ,
    coverImage : coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
 })

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" 
)
if (!createdUser) {
    throw new ApiError(500 , "Something went wrond while registering the user ")
}

return res.status(201).json(new ApiResponse(200, createdUser , "user registered successfully !"))
 
} )

export {
    registerUser,
}

