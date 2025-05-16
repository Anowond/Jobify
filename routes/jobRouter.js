import express from 'express'
import { createJob, deleteJob, updateJob, getAllJobs, getJobById, showStats } from '../controllers/jobController.js'
import {validateJob, validateId} from '../middlewares/validationMiddleware.js'
import { checkTestUser } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.route('/').get(getAllJobs).post(checkTestUser, validateJob, createJob)
router.route('/stats').get(showStats)
router.route('/:id').all(validateId).get(getJobById).patch(checkTestUser, validateJob,updateJob).delete(checkTestUser,deleteJob)

export default router