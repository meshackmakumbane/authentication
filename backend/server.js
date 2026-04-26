import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()

import connectDb from './db/connectDb.js'
import userRouter from './routes/userRoutes.js'

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
   origin: process.env.CLIENT_URL,
   credentials: true
}))

app.use('/user', userRouter)

//Render requirement
app.set("trust proxy", 1)

//Error Handling Middleware
app.use((err, req, res, next)=>{
   const statusCode = err.status || 500
   const message = err.message || 'Internal server error'
   const data = process.env.NODE_ENV === 'development' ? err.stack : null

   res.status(statusCode).json({
      message,
      data
   })
})

app.listen(PORT, ()=>{
   connectDb()
   console.log(`Server is running on port: ${PORT}`)
})