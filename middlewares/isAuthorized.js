import {Forbidden} from '../errors/errors.js'

const isAuthorized = (req,res,next) => {
    const authorizedRoles = ['admin', 'superuser']
    if (!authorizedRoles.includes(req.user.role)) {
        throw new Forbidden("You are not authorized to view this page")
    }
    next()
}

export default isAuthorized