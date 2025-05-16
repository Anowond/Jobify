import Wrapper from '../assets/wrappers/DashboardFormPage'
import {Form, redirect, useLoaderData} from 'react-router-dom'
import CustomAxios from '../utils/customAxios'
import Input from '../components/Input'
import Select from '../components/Select'
import {toast} from 'react-toastify'
import { JOB_STATUS, JOB_TYPES } from '../../../utils/constants'
import SubmitBtn from '../components/SubmitBtn'

export const getJobLoader = async ({params}) => {
  try {
    const {data} = await CustomAxios.get(`/jobs/${params.id}`, {withCredentials: true})
    return data.job
  } catch (err) {
    const response = err?.response?.data
    if (response.errors) {response.errors.forEach(error => toast.error(error))}
    if (response.error) {toast.error(response.error)}
    return redirect('../all-jobs')
  }
}

export const updateJobAction = async ({request, params}) => {
    try {
      const formData = await request.formData()
      const data = Object.fromEntries(formData)
      await CustomAxios.patch(`/jobs/${params.id}`, data, {withCredentials: true})
      toast.success('Job updated successfully.')
      return redirect('../all-jobs')
    } catch (err) {
      const response = err?.response?.data
      if (response.errors) {response.errors.forEach(error => toast.error(error))}
      if (response.error) {toast.error(response.error)}
    }
}

const EditJob = () => {
  const job = useLoaderData()
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className="form-center">
          <Input name='position' defaultValue={job.position} />
          <Input name='company' defaultValue={job.company} />
          <Input name='location' labelName='job location' defaultValue={job.location} />
          <Select name='status' labelName='job status' defaultValue={job.status} options={Object.values(JOB_STATUS)} />
          <Select name='type' labelName='job type' defaultValue={job.type} options={Object.values(JOB_TYPES)} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}
export default EditJob