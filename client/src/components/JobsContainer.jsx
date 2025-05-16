import Wrapper from '../assets/wrappers/JobsContainer'
import { useAllJobsContext } from '../pages/AllJobs'
import Job from './Job'
import PageBtnContainer from './PageBtnContainer'
import ComplexPageBtnContainer from './ComplexPageBtnContainer'

const JobsContainer = () => {
  const {data} = useAllJobsContext()
  const {jobs, totalJobs, numOfPages, currentPage} = data
  if (jobs.length === 0) {
    return <Wrapper>
      <h2>No jobs to dispay....</h2>
    </Wrapper>
  }
  return (
    <Wrapper>
      <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>
      <div className="jobs">
        {jobs.map(job => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {numOfPages > 1 && <ComplexPageBtnContainer />}
    </Wrapper>
  )
}
export default JobsContainer