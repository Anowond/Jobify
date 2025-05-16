import Job from '../database/models/Job.js'
import mongoose from 'mongoose'
import dayjs from 'dayjs'

// get all jobs
export const getAllJobs = async (req,res) => {
    const {search, status, type, sort} = req.query
    // Filter
    const filter = {
        created_by: req.user.id,
    }
    // Research either on position and company, if property exists
    if (search) filter.$or = [
        {position: {$regex: search, $options: 'i'}},
        {company: {$regex: search, $options: 'i'}},
    ]
    // Status and Type filter, if property exists
    if (status && status !== 'all') filter.status = status
    if (type && type !== 'all') filter.type = type
    // Sort, if property exists
    const sortOptions = {
        newest: '-createdAt',
        oldest: 'createdAt',
        'a-z': 'position',
        'z-a': '-position'
    }
    const sortKey = sortOptions[sort] || sortOptions.newest

    // Setup pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) * limit

    const jobs = await Job.find(filter).sort(sortKey).skip(skip).limit(limit)
    const totalJobs = await Job.countDocuments(filter)
    const numOfPages = Math.ceil(totalJobs/limit)
    
    res.status(200).json({totalJobs, numOfPages, currentPage:page, jobs})
}

// create a job
export const createJob = async (req,res) => {
    req.body.created_by = req.user.id
    const job = await Job.create(req.body)
    res.status(201).json({job})
}

// get a single job
export const getJobById = async (req,res) => {
    const job = await Job.findById(req.params.id)
    res.status(200).json({job})
}

// edit a job
export const updateJob = async (req,res) => {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json({success: true, job})
}

// delete a job
export const deleteJob = async (req,res) => {
    const job = await Job.findByIdAndDelete(req.params.id)
    res.status(200).json({msg: 'job deleted', job})
}

// Return aggregated jobs
export const showStats = async (req,res) => {
    // Aggregate jobs by status 
    let stats = await Job.aggregate([
        // Grab all jobs of specific user
        {$match: {created_by: new mongoose.Types.ObjectId(req.user.id)}},
        // Group theses jobs by status then count
        {$group: {_id: '$status', count:{$sum:1}}},
    ])
    // Format stats array to object
    stats = stats.reduce((acc,curr) => {
        const {_id: title, count} = curr
        acc[title] = count
        return acc
    }, {})
    // Return stats or 0 if no jobs to return
    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    }
    let monthlyApplications = await Job.aggregate([
        {$match: {created_by: new mongoose.Types.ObjectId(req.user.id)}},
        // group by year/month and count
        {$group: {
                _id: {year: {$year: '$createdAt'}, month: {$month: '$createdAt'}},
                count: {$sum: 1}
            },
        },
        {$sort: {'_id.year' : -1, '_id.month' : -1 }},
        {$limit: 6}
    ])
    // Format the aggregate to a proper reversed array
    monthlyApplications = monthlyApplications.map(item => {
        const {_id: {year, month}, count} = item
        const date = dayjs().month(month -1).year(year).format('MMM YY')
        return {date, count}
    }).reverse()
    
    res.status(200).json({defaultStats, monthlyApplications})
}
