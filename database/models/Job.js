import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPES } from "../../utils/constants.js";

const JobSchema = mongoose.Schema({
    company: {type: String, required: true},
    position: {type: String, required: true},
    location: {type: String, default: 'my city'},
    status: {type: String, enum: Object.values(JOB_STATUS), default: JOB_STATUS.PENDING},
    type: {type: String, enum: Object.values(JOB_TYPES), default: JOB_TYPES.FULL_TIME},
    created_by: {type: mongoose.Types.ObjectId, ref: 'users'}
}, {timestamps: true})

export default mongoose.model('jobs', JobSchema)
