import mongoose from "mongoose";
import { USER_ROLES } from "../../utils/constants.js";

const UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    lastname: {type: String, default: 'lastname', required: true},
    location: {type: String, default: 'my city', required: true},
    role: {type: String, enum: Object.values(USER_ROLES), default: USER_ROLES.USER, required: true},
    avatar: {type: String},
    avatarPublicId: {type: String}
},
// Supression du mot de passe dans les retours JSON des requêtes
{
    toJSON: {
        transform(doc, ret) {
            delete ret.password
            return ret
        }
    }
})

export default mongoose.model('users', UserSchema)