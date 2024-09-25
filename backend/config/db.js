import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING

export const connectDB = mongoose.connect(MONGODB_CONNECTION_STRING)
.then(() => {
    console.log('DataBase Connected')
})
.catch(() => {
    console.log('DB Connection Failed')
})