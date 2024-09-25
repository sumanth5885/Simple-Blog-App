import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
// import bodyParser from 'body-parser'
import { connectDB } from './config/db.js'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated.js'

//importing routes
import { blogRoutes } from './routes/blog.route.js'
import { userRoutes } from './routes/user.route.js'

//importing models
import { BlogModel } from './models/blog.model.js'

//evnironmental variable settings
dotenv.config()

//starting express
const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// app.use(bodyParser.json())

//variables
const PORT = process.env.PORT
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING

//routings
app.use('/images', express.static('uploads'));
app.use('/api/blogs', ensureAuthenticated, blogRoutes)
app.use('/api/user', userRoutes)


//checking route
app.get('/', (request, response) => {
    response.send("Express Working")
})


//Data Base Connection
connectDB


//server running
app.listen(PORT, () => {
    console.log('App Running...')
})
