import Wrapper from '../assets/wrappers/StatsContainer'
import CustomAxios from '../utils/customAxios'
import {toast} from 'react-toastify'
import {redirect, useLoaderData} from 'react-router-dom'
import StatItem from '../components/StatItem'
import {FaCalendarCheck, FaSuitcaseRolling} from 'react-icons/fa'

export const AdminLoader = async () => {
  try {
    const response = await CustomAxios.get('/users/admin/stats', {withCredentials: true})
    return response.data
  } catch (err) {
    toast.error(err)
    return redirect('/dashboard')
  }
}

const Admin = () => {
  const {users, jobs} = useLoaderData()
  return (
    <Wrapper>
      <StatItem title='current users' count={users} color="#e9b949" bcg="#fcefc7" icon={<FaSuitcaseRolling />} />
      <StatItem title='total jobs' count={jobs} color="#647acb" bcg="#e0e8f9" icon={<FaCalendarCheck />} />
    </Wrapper>
  )
}
export default Admin