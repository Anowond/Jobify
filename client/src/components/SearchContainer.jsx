import { Form, Link, useSubmit } from 'react-router-dom'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import Input from '../components/Input'
import Select from '../components/Select'
import {JOB_STATUS, JOB_TYPES, SORT_OPTIONS} from '../utils/constants'
import { useAllJobsContext } from '../pages/AllJobs'

const SearchContainer = () => {
  const {searchValues} = useAllJobsContext()
  const {search, status, type, sort} = searchValues
  const submit = useSubmit()

  // Debounce
  const debounce = (onChange) => {
    let timeOut
    return (e) => {
     clearInterval(timeOut)
     const form = e.currentTarget.form
     timeOut = setTimeout(() => {
        onChange(form)
      }, 2000)
    }
  }

  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className="form-center">
          <Input name='search' defaultValue={search} onChange={debounce(form => {submit(form)})} />
          <Select name='status' labelName='job status' options={['all', ...Object.values(JOB_STATUS)]} defaultValue={status} onChange={e => submit(e.currentTarget.form)} />
          <Select name='type' labelName='job type' options={['all', ...Object.values(JOB_TYPES)]} defaultValue={type} onChange={e => submit(e.currentTarget.form)} />
          <Select name='sort' options={Object.keys(SORT_OPTIONS)} defaultValue={sort} onChange={e => submit(e.currentTarget.form)} />
          <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>Reset Search Values</Link>
        </div>
      </Form>
    </Wrapper>
  )
}
export default SearchContainer