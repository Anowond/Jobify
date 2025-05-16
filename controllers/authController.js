import User from '../database/models/User.js'
import { Unauthorized } from '../errors/errors.js'
import { createJWT } from '../utils/JwtUtils.js'
import {decryptPassword, hashPassword} from '../utils/passwordUtils.js'

// Register a user
export const register = async (req,res) => {
    // Assign the admin role to the first account
    const isFirstUser = await User.countDocuments() === 0
    req.body.role = isFirstUser ? "admin" : "user"
    // Hash password
    req.body.password = await hashPassword(req.body.password)
    const user = await User.create(req.body)
    // JWT
    const jwt_token = createJWT({id: user.id, role: user.role})
    const timer = 1000 * 60 * 15
    res.cookie('jwt_token', jwt_token, {
        httpOnly: true,
        expires: new Date(Date.now() + timer),
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
    })
    res.status(201).json({msg: `User created successfully`})
}

// Login a user
export const login = async (req,res) => {
    const user = await User.findOne({email:req.body.email})
    const isValidUser = user && await decryptPassword(req.body.password, user.password)
    if (!isValidUser) throw new Unauthorized('Invalid credentials.')
    // JWT
    const jwt_token = createJWT({id: user.id, role: user.role})
    const timer = 1000 * 60 * 15
    res.cookie('jwt_token', jwt_token, {
        httpOnly: true,
        expires: new Date(Date.now() + timer),
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    })
    res.status(200).json({msg: 'Login successful.'})
}

// logout
export const logout = (req,res) => {
    res.clearCookie('jwt_token', {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    })
    res.status(200).json({msg: 'You are logged out.'})
}
