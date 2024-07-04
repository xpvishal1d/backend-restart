import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// cors configration
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true 
}))


// configration to json limits data size and usr se data aayega to use encode karna && public folder ka access dena
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true , limit : " 16kb"}))
app.use(express.static("public"))

// cookieParser ka configration 
app.use(cookieParser())

// routes import
import userRouter from './routes/user.routes.js'

// routes declaration
app.use("/api/v1/users" , userRouter)

export { app }