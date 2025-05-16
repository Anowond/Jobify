import CustomAxios from '../utils/customAxios'
import {useLoaderData} from 'react-router-dom'
import handleAPIError from '../utils/handleAPIErrors'
import StatsContainer from '../components/StatsContainer'
import ChartsContainer from '../components/ChartsContainer'

export const StatsLoader = async () => {
  try {
   const {data} = await CustomAxios.get('/jobs/stats')
   return data
  }
  catch (err) {
    handleAPIError(err)
  }
}

const Stats = () => {
  const {defaultStats, monthlyApplications} = useLoaderData() 
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications.length > 1 && <ChartsContainer data={monthlyApplications} />}
    </>
  )
}
export default Stats