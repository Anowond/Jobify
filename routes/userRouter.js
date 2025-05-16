import express from 'express'
const router = express.Router()
import { deleteUser, getCurrentUser, updateUser, getApplicationStats } from '../controllers/userController.js'
import { validateUpdateUser } from '../middlewares/validationMiddleware.js'
import isAuthorized from '../middlewares/isAuthorized.js'
import upload from '../middlewares/multerMiddleware.js'
import { checkTestUser } from '../middlewares/authMiddleware.js'

router.get('/getCurrentUser', getCurrentUser)
router.get('/admin/stats', isAuthorized, getApplicationStats)
router.patch('/update', checkTestUser, upload.single('avatar'), validateUpdateUser, updateUser)
router.delete('/delete', deleteUser)


export default router