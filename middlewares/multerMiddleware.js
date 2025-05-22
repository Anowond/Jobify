import multer from "multer";
import DataParser from 'datauri/parser.js'
import path from 'path'
import { BadRequest } from "../errors/errors.js";

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new BadRequest('Unauthaurized file type.'), false)
    }
}

const upload = multer({storage, fileFilter})

const parser = new DataParser()

export const formatImage = file => {
    const fileExtension = path.extname(file.originalname).toString()
    return parser.format(fileExtension, file.buffer).content
}
 
export default upload