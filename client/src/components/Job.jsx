import {FaLocationArrow, FaCalendarAlt, FaBriefcase} from 'react-icons/fa'
import Wrapper from "../assets/wrappers/Job"
import dayjs from "dayjs"
import advancedFormat from 'dayjs/plugin/advancedFormat'
import JobInfo from "./JobInfo"
import { Link, Form } from 'react-router-dom'
dayjs.extend(advancedFormat)

const Job = ({_id, position, type, company, status, location, createdAt}) => {
    const date = dayjs(createdAt).format('MMM Do, YYYY')
  return (
    <Wrapper>
        <header>
            <div className="main-icon">{company.charAt(0)}</div>
            <div className="info">
                <h5>{position}</h5>
                <p>{company}</p>
            </div>
        </header>
        <div className="content">
            <div className="content-center">
                <JobInfo icon={<FaLocationArrow />} text={location} />
                <JobInfo icon={<FaCalendarAlt />} text={date} />
                <JobInfo icon={<FaBriefcase />} text={type} />
                <div className={`status ${status}`}>{status}</div>
            </div>
            <footer className='actions'>
                <Link to={`../editJob/${_id}`} className='btn edit-btn' >Edit</Link>
                <Form method='post' action={`../deleteJob/${_id}`}>
                    <button type='submit' className='btn delete-btn'>Delete</button>
                </Form>
            </footer>
        </div>
    </Wrapper>
  )
}
export default Job