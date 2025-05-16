import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom"
import Wrapper from "../assets/wrappers/Dashboard"
import { BigSidebar, Navbar, SmallSidebar } from "../components"
import { createContext, useContext, useState } from "react"
import { checkDefaultTheme } from "../App"
import customAxios from "../utils/customAxios"
import { toast } from "react-toastify"

export const DashboardLoader = async () => {
  try {
    const {data} = await customAxios.get('/users/getCurrentUser', {withCredentials: true})
    return data
  } catch (err) {
    return redirect('/')
  }
}

const DashboardContext = createContext()

const DashboardLayout = () => {
  const navigate = useNavigate()
  const {user} = useLoaderData()
  
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme)

  const toggleDarkTheme = () => {
    const newDarkThemeValue = !isDarkTheme
    setIsDarkTheme(newDarkThemeValue)
    document.body.classList.toggle('dark-theme', newDarkThemeValue)
    localStorage.setItem('darkTheme', newDarkThemeValue)
  }

  const toggleSideBar = () => {
    setShowSidebar(!showSidebar)
  }

  const logout = async () => {
    try {
      const response = await customAxios('/auth/logout', {withCredentials: true})
      toast.success(response.data.msg)
      navigate('/')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  return (
    <DashboardContext.Provider value={{user,showSidebar,isDarkTheme, toggleDarkTheme, toggleSideBar, logout}}>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{user}} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout