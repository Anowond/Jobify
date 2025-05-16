import { toast } from "react-toastify"
import customAxios from "../utils/customAxios"
import { redirect } from "react-router-dom"

export const deleteJobAction = async ({params}) => {
  try {
    await customAxios.delete(`/jobs/${params.id}`, {withCredentials: true})
    toast.success('Job deleted.')
  } catch (err) {
    const response = err?.response?.data
    if (response.errors) {response.errors.forEach(error => toast.error(error))}
    if (response.error) {toast.error(response.error)}
  }
  return redirect('../all-jobs')
}

const DeleteJob = () => {
  return (
    <h1>DeleteJob Page</h1>
  )
}
export default DeleteJob