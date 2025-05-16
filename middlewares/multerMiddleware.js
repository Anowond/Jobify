import multer from "multer";
import { BadRequest } from "../errors/errors.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        const filename = file.originalname
        cb(null, filename)
    },
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new BadRequest('Unauthaurized file type.'), false)
    }
}

const upload = multer({storage, fileFilter})

export default upload