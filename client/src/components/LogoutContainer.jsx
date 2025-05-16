import {FaUserCircle, FaCaretDown} from 'react-icons/fa'
import Wrapper from '../assets/wrappers/LogoutContainer'
import {useDashboardContext} from '../pages/DashboardLayout'
import { useState } from 'react'

const LogoutContainer = () => {

  const [showBtn, setShowBtn] = useState(false)
  const {user, logout} = useDashboardContext()

  return (
    <Wrapper>
      <button type='button' className='btn logout-btn' onClick={() => setShowBtn(!showBtn)}>
        {user.avatar ? <img src={user.avatar} alt='avatar' className='img' /> : <FaUserCircle />}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showBtn ? "dropdown show-dropdown" : "dropdown"}>
        <button type='button' className='dropdown-btn' onClick={() => logout()}>Logout</button>
      </div>
    </Wrapper>
  )
}
export default LogoutContainer