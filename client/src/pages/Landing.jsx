import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
        <div className="container page">
          <div className="info">
            <h1>job <span>tracking</span></h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem ducimus placeat ea asperiores harum! Tenetur sed libero impedit ab distinctio architecto adipisci ducimus quasi! Ad porro repudiandae laboriosam tempora. Tempora, qui. Iure, assumenda. Optio rerum ut esse deleniti voluptates laboriosam, assumenda hic repudiandae nihil mollitia, earum quae enim, fuga officia.</p>
            <Link to='/register' className='btn register-link'>Register</Link>
            <Link to='/login' className='btn'>Login / Demo User</Link>
          </div>
          <img src={main} alt='job hunt'  className='img main-img'/>
        </div>
    </Wrapper>
  )
}

export default Landing