import Job from "../database/models/Job.js"
import User from "../database/models/User.js"
import cloudinary from 'cloudinary'
import {promises as fs} from 'fs'

// get current suer
export const getCurrentUser = async (req,res) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({user})
} 

// get application stats (admin route)
export const getApplicationStats = async (req,res) => {
    const users = await User.countDocuments()
    const jobs = await Job.countDocuments()
    res.status(200).json({users, jobs})
}

// update a user
export const updateUser = async (req,res) => {
    // Remove password from request
    const newUser = {...req.body}
    delete newUser.password
    // If user sent new avatar, remove it from local server and ad dit to cloudinary
    if (req.file) {
        const response = await cloudinary.v2.uploader.upload(req.file.path)
        await fs.unlink(req.file.path)
        newUser.avatar = response.secure_url
        newUser.avatarPublicId = response.public_id
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.id, newUser)
    // Remove old avatar on cloudinary if its exists
    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
    }
    res.status(200).json({msg:'User updated successfully.'})
}

// delete a user
export const deleteUser = async (req,res) => {
    const user = await User.findByIdAndDelete(req.user.id)
    // Que faire des jobs que l'user a créer ?
    res.clearCookie('jwt_token', {
        httpOnly: true,
        sameSite: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production'
    })
    res.status(200).json({msg: `User ${user.email} deleted.`})
}
