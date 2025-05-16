import jwt from 'jsonwebtoken'

// Create a jwt
export const createJWT = payload => {
    const jwt_token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '15min'})
    return jwt_token
}
