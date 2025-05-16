import jwt from 'jsonwebtoken'
import { BadRequest, Unauthorized } from '../errors/errors.js'

 export const authMiddleware = (req,res,next) => {
    const tokenCookie = req.cookies.jwt_token
    if (!tokenCookie) throw new Unauthorized('Invalid authentication.')
    const {id, role} = jwt.verify(tokenCookie, process.env.JWT_SECRET)
    // Add test user identification
    const testUser = id === process.env.TEST_USER
    req.user = {id, role, testUser}
    next()
}

// Test user restriction middleware
export const checkTestUser = (req,res,next) => {
    if (req.user.testUser) throw new BadRequest('Demo User. Read Only !')
    next()
}
