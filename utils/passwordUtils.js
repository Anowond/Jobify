import bcrypt from 'bcrypt'

 export const hashPassword = async password => {
    const hash = await bcrypt.hash(password, 10)
    return hash
}

export const decryptPassword = async (password, hashedpassword) => {
    const decoded = await bcrypt.compare(password, hashedpassword)
    return decoded
}
