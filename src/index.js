import dotenv from "dotenv"
import mongoose, { connect } from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({path :'./env'})



connectDB()

























/*
db connection 

import express from "express";

const app = express()


(async () =>{
    try {
      await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      app.on("error" , (error) => {
        console.log("ERROR:" , error);
        throw error
      })

      app.listen(process.env.PORT , () => {
        `app is listening on ${process.env.PORT}`
      })
    } catch (error) {
        console.error("ERROR: ", error)
        throw error
    }
})()

*/