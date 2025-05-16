import { Form, Link, redirect, useNavigate } from "react-router-dom"
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Input, Logo } from "../components"
import { toast } from "react-toastify"
import customAxios from "../utils/customAxios"
import handleAPIErrors from "../utils/handleAPIErrors"
import SubmitBtn from "../components/SubmitBtn"

export const loginAction = async ({request}) => {
  try {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
     const response = await customAxios.post('/auth/login', data)
    toast.success(response.data.msg)
    return redirect('/dashboard')
  } catch (err) {
    handleAPIErrors(err)
  }
}

const Login = () => {
  const navigate = useNavigate()

  const loginTestUser = async () => {
    try {
      const data = {
        email: 'test@mail.com',
        password: 'Passw0rd'
      }
      await customAxios.post('/auth/login', data)
      toast.success('Take a test drive !')
      navigate('/dashboard')
    } catch (err) {
      handleAPIErrors(err)
    }
  }

  return (
    <Wrapper>
      <Form className="form" method='post'>
        <Logo />
        <h4>Login</h4>
        <Input name='email' type='email' required={true} />
        <Input name='password' type='password' required={true} />
        <SubmitBtn />
        <button type="button" className="btn-block btn" onClick={() => loginTestUser()}>Explore the app</button>
        <p>
          Not a member yet ?
          <Link to='/register' className="member-btn">Register</Link>
        </p>
      </Form>
    </Wrapper>

  )
}
export default Login