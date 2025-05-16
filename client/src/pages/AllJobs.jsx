import customAxios from '../utils/customAxios'
import {useLoaderData} from 'react-router-dom'
import SearchContainer from '../components/SearchContainer'
import JobsContainer from '../components/JobsContainer'
import { createContext, useContext } from 'react'
import handleAPIErrror from '../utils/handleAPIErrors'

export const allJobsLoader = async ({request}) => {
  // Get query parameters
 const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ])
  try {
    const {data} = await customAxios.get('/jobs', {params})
    return {data, searchValues: {...params}}
  } catch (err) {
    handleAPIErrror(err)
  }
}

const AllJobsContext = createContext()

const AllJobs = () => {
  const {data, searchValues} = useLoaderData()

  return (
    <AllJobsContext.Provider value={{data, searchValues}}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  )
}
export const useAllJobsContext = () => useContext(AllJobsContext)
export default AllJobs