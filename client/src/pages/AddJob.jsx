import { Form, useOutletContext, redirect } from "react-router-dom"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import { Input } from "../components"
import { JOB_STATUS, JOB_TYPES } from "../utils/constants"
import Select from "../components/Select"
import customAxios from "../utils/customAxios"
import { toast } from "react-toastify"
import handleAPIErrors from "../utils/handleAPIErrors"
import SubmitBtn from "../components/SubmitBtn"

export const createJob = async ({request}) => {
  try {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    await customAxios.post('/jobs', data, {withCredentials: true})
    toast.success('Job created')
    return redirect('/dashboard/all-jobs')
  } catch (err) {
    handleAPIErrors(err)
  }
}
 
const AddJob = () => {
  const {user} = useOutletContext()
  return (
    <Wrapper>
        <Form method="post" className="form">
          <h4 className="form-title">Add Job</h4>
          <div className="form-center">
            <Input name="position" required={true} />
            <Input name="company" required={true} />
            <Input name="location" labelName='job location' required={true} />
            <Select name='status' labelName='job status' options={Object.values(JOB_STATUS)} defaultValue={JOB_STATUS.PENDING} />
            <Select name='type' labelName='job type' options={Object.values(JOB_TYPES)} defaultValue={JOB_TYPES.FULL_TIME} />
            <SubmitBtn formBtn />
          </div>
        </Form>
    </Wrapper>
  )
}
export default AddJob