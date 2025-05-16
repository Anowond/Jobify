import { useEffect, useState } from "react"
import customAxios from "../utils/customAxios"
import { useNavigate } from "react-router-dom"

const RequireAuth = ({children}) => {
    const [isAuth, setIsAuth] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const getCurrentUser = async () => {
            const response = await customAxios.get('/users/getCurrentUser', {withCredentials: true})
            if (response.status === 200) {
                setIsAuth(true)
            } else {
                navigate('/')
            }
        }
        getCurrentUser()
    }, [])

  return isAuth && children 
}
export default RequireAuth