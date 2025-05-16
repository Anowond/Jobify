import { useDashboardContext } from "../pages/DashboardLayout"
import links from "../utils/links"
import { NavLink } from "react-router-dom"

const NavLinks = ({isBigSidebar}) => {

    const {toggleSideBar, user} = useDashboardContext()

  return (
    <div className="nav-links">
              {links.map((link,i) => {
                const {path, icon, text} = link
                if (path === 'admin' && user.role !== 'admin') return
                 return <NavLink to={path} key={i} className='nav-link' onClick={() => {!isBigSidebar && toggleSideBar()}} end>
                    <span className="icon" >
                      {icon}
                    </span>
                    {text}
                  </NavLink>
              })}
    </div>
  )
}
export default NavLinks