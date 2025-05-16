import { Link, useRouteError } from "react-router-dom"
import Wrapper from "../assets/wrappers/ErrorPage"
import img from '../assets/images/not-found.svg'

const Error = () => {
  const error = useRouteError()
  console.log(error)
  return error.status === 404 ? (
    <Wrapper>
      <div>
        <img src={img} alt="not found" />
        <h3>Page not found</h3>
        <p>It seems we can't find the pange you are looking for</p>
        <Link to='/dashboard'>Back Home</Link>
      </div>
    </Wrapper>
  ) : (
    <Wrapper>
      <div>
        <h1>Something went wrong.</h1>
        <Link to='/dashboard'>Back Home</Link>
      </div>
    </Wrapper>
  )
}
export default Error