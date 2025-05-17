import { Outlet, redirect, useLoaderData, useNavigate, useNavigation } from "react-router-dom"
import Wrapper from "../assets/wrappers/Dashboard"
import { BigSidebar, Navbar, SmallSidebar } from "../components"
import { createContext, useContext, useState } from "react"
import { checkDefaultTheme } from "../App"
import customAxios from "../utils/customAxios"
import { toast } from "react-toastify"
import Loading from "../components/Loading"

export const DashboardLoader = async () => {
  try {
    const {data} = await customAxios.get('/users/getCurrentUser')
    return data
  } catch (err) {
    return redirect('/')
  }
}

const DashboardContext = createContext()

const DashboardLayout = () => {
  const navigate = useNavigate()
  const navigation = useNavigation()
  const {user} = useLoaderData()
  
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme)

  const isPageLoading = navigation.state === 'loading'

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
      const response = await customAxios('/auth/logout')
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
              {isPageLoading ? <Loading /> : <Outlet context={{user}} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout