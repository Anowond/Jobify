import { Form, Link, redirect, useNavigation } from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { Logo, Input } from "../components"
import customAxios from "../utils/customAxios"
import { toast } from "react-toastify"
import SubmitBtn from "../components/SubmitBtn"

export const registerAction = async ({request}) => {
  try {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    await customAxios.post('/auth/register', data, {withCredentials: true})
    toast.success('Registration sucessful !')
    return redirect('/dashboard')
  } catch (err) {
    const errors = err?.response?.data?.errors
    errors && errors.map(error => toast.error(error))
  }
}

const Register = () => {
  return (
    <Wrapper>
      <Form className="form" method="post">
        <Logo />
        <h4>Register</h4>
        <Input name='name' required={true} />
        <Input name='lastname' labelName='Last Name' required={true} />
        <Input name='location' />
        <Input name='email'required={true} />
        <Input name='password' type='password' required={true} />
        <SubmitBtn />
        <p>
          Already a member ?
          <Link to='/login' className="member-btn">Login</Link>
        </p>
      </Form>
    </Wrapper>
  )
}
export default Register