import {readFile} from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import User from './database/models/User.js'
import Job from './database/models/Job.js'

try {
    await mongoose.connect(process.env.MONGo_URI, {connectTimeoutMS: 2000})
    const user = await User.findOne({email: 'max.baroux@mail.com'})
    const jsonJobs = JSON.parse(await readFile(new URL('./utils/mockData.json', import.meta.url)))
    const jobs = jsonJobs.map(job => {return {...job, created_by: user._id}})
    await Job.deleteMany({created_by: user._id})
    await Job.create(jobs)
    console.log('Success')
    process.exit(0)
} catch (err) {
    console.log(err)
    process.exit(1)
}