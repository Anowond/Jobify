// Middleware de validation des données
import { body, param, validationResult } from "express-validator"
import { JOB_STATUS, JOB_TYPES, USER_ROLES } from "../utils/constants.js"
import mongoose from "mongoose"
import { BadRequest, Forbidden, NotFoundError } from "../errors/errors.js"
import Job from '../database/models/Job.js'
import User from "../database/models/User.js"

const validationMiddleware = (values) => {
    return [
        values,
        (req,res,next) => {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                const errors = result.errors.map(error => error.msg)
                if (errors[0].startsWith('No result')) throw new NotFoundError(errors)
                if (errors[0].startsWith('The access')) throw new Forbidden(errors)
                return res.status(400).json({errors})
            }
            next()
        }
    ]
}

// Validation des inputs de Job
export const validateJob = validationMiddleware([
    body('position').trim().notEmpty().withMessage('Position is required.'),
    body('company').trim().notEmpty().withMessage('Company is required.'),
    body('location').trim().notEmpty().withMessage('Location is required.'),
    body('status').notEmpty().withMessage('Job status required.').bail().isIn(Object.values(JOB_STATUS)).withMessage('Invalid job status.'),
    body('type').notEmpty().withMessage('Job type required.').bail().isIn(Object.values(JOB_TYPES)).withMessage('Invalid job type.')
])

// Validation des inputs des users
export const validateRegisterUser = validationMiddleware([
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().notEmpty().withMessage('Email is required').bail().isEmail().withMessage('Wrong email format.').bail().custom(async value => {
            const user = await User.findOne({email: value})
            if (user) throw new Error('This user already exists.')
            return true
    }),
    body('password').trim().notEmpty().withMessage('Password is required').bail().custom(value => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g
        if (!pattern.test(value)) throw new BadRequest('Invalid password format (must contain at least one uppercase, one lowercase, one digit and must be at least 8 chraracters long')
        return true
    }),
    body('lastname').trim().notEmpty().withMessage('Lastname is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
])

// Validation du login de l'user
export const validateLoginUser = validationMiddleware([
    body('email').trim().notEmpty().withMessage('Email is required').bail().isEmail(),
    body('password').trim().notEmpty().withMessage('Password is required').bail()
])

// Validation de l'update de l'user
export const validateUpdateUser = validationMiddleware([
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().notEmpty().withMessage('Email is required').bail().isEmail().withMessage('Wrong email format.').bail().custom(async (value, {req}) => {
            const user = await User.findOne({email: value})
            if (user && req.user.id !== user._id.toString()) throw new Error('This user already exists.')
            return true
    }),
    body('lastname').trim().notEmpty().withMessage('Lastname is required'),
    body('location').trim().notEmpty().withMessage('Location is required')
])

// Validetaion des DIs mongoose 
export const validateId = validationMiddleware([
        param('id').custom(async (value, {req}) => {
            const isValidId = mongoose.Types.ObjectId.isValid(value)
            if (!isValidId) throw new BadRequest(`Invalid MongoDB ID.`)
            const job = await Job.findById(value)
            if (!job) throw new NotFoundError(`No job found with this id : ${value}`)
            const isAdmin = req.user.role === 'admin'
            const isOwner = job.created_by.toString() === req.user.id
            if (!isAdmin && !isOwner) throw new Forbidden('The access to this resscource is restricted to his owner.')
            return true
    })
])

