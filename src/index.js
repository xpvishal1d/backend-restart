import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

// import mongoose, { connect } from "mongoose";
// import { DB_NAME } from "./constants.js";

dotenv.config({path :'./.env'})



connectDB()
.then(() => {

  app.on("error" , (error) => {
    console.log("ERROR:" , error);
    throw error
  })

  const PORT = process.env.PORT || 8000 

  app.listen(PORT , () => {
    console.log(`app is runnig on port : ${PORT}`);
  } )
})
.catch((err) => {
  console.log("MONGO db connection failed !!" , err);
})

























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