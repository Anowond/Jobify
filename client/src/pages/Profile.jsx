import Wrapper from '../assets/wrappers/DashboardFormPage'
import {Form, useOutletContext} from 'react-router-dom'
import Input from '../components/Input'
import CustomAxios from '../utils/customAxios'
import {toast} from 'react-toastify'
import handleAPIErrors from '../utils/handleAPIErrors'
import SubmitBtn from '../components/SubmitBtn'

export const updateUserAction = async ({request}) => {
  try {
    const formData = await request.formData()
    // File size validation
    const file = formData.get('avatar')
    if (file && file.size > 500000) {
      toast.error('Image file is too big')
      return
    }
    const {data} = await CustomAxios.patch('/users/update', formData)
    toast.success(data.msg)
  } catch (err) {
    handleAPIErrors(err)
  }
  }

const Profile = () => {
  const {user} = useOutletContext()
  const {name, lastname, email, location} = user
  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className='form-label'>Select an image file (max 0.5MB)</label>
            <input type="file" id='avatar' name='avatar' className='form-input' accept='image/*' />
          </div>
          <Input name='name' defaultValue={name} />
          <Input name='lastname' defaultValue={lastname} labelName='last name' />
          <Input type='email' name='email' defaultValue={email} />
          <Input name='location' defaultValue={location} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}
export default Profile