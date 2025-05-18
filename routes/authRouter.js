import express from 'express'
const router = express.Router()
import { validateRegisterUser, validateLoginUser } from '../middlewares/validationMiddleware.js'
import { login, logout, register } from '../controllers/authController.js'
import rateLimiter from 'express-rate-limit'

// Rate limiter
const limiter = rateLimiter({
    windowMs: 1000 * 60 * 15,
    max: 10,
    message: {error: 'IP rate limit excedeed, retry in 15 minutes.'}
})

router.post('/login', limiter, validateLoginUser, login)
router.post('/register', limiter, validateRegisterUser, register)
router.get('/logout', logout)

export default router