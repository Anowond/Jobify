import { FaTimes } from "react-icons/fa"
import Wrapper from "../assets/wrappers/SmallSidebar"
import { useDashboardContext } from "../pages/DashboardLayout"
import Logo from "./Logo"
import NavLinks from "./NavLinks"

const SmallSidebar = () => {
  const {showSidebar, toggleSideBar} = useDashboardContext()
  return (
    <Wrapper>
      <div className={showSidebar ? "sidebar-container show-sidebar" : 'sidebar-container'}>
        <div className="content">
          <FaTimes className="close-btn" onClick={() => toggleSideBar()}/>
          <header>
            <Logo />
            <NavLinks />
          </header>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar