import express from 'express'
const router = express.Router()
import { validateRegisterUser, validateLoginUser } from '../middlewares/validationMiddleware.js'
import { login, logout, register } from '../controllers/authController.js'

router.post('/login', validateLoginUser, login)
router.post('/register', validateRegisterUser, register)
router.get('/logout', logout)

export default router