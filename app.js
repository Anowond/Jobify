import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
import jobRouter from './routes/jobRouter.js'
import userRouter from './routes/userRouter.js'
import authRouter from './routes/authRouter.js'
import {connection} from './database/connection.js'
import ErrorHandlerMiddleware from './middlewares/ErrorHandlerMiddleware.js.js'
import {authMiddleware} from './middlewares/authMiddleware.js'
import cloudinary from 'cloudinary'
connection()

//public
import {dirname} from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
import { Script } from 'vm'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
process.env.NODE_ENV === 'development' && app.use(morgan('dev'))
// Content Security Policies
app.use(helmet.contentSecurityPolicy({
    directives: {
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"]
    }
}))
app.use(mongoSanitize())

// Expose public folder
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/dist')))

//cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

app.use('/api/auth', authRouter)
app.use('/api/jobs', authMiddleware, jobRouter)
app.use('/api/users', authMiddleware, userRouter)

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})

// Not found Middleware
app.use((req,res) => {
    res.status(404).json({error: 'Not found'})
})

// Error Middleware
app.use(ErrorHandlerMiddleware)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))