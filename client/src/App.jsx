import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomeLayout, Landing, Register, Login, DashboardLayout, Error, AddJob, Stats, AllJobs, Profile, Admin, EditJob} from "./pages"
import { registerAction} from "./pages/Register"
import { loginAction } from "./pages/Login"
import { DashboardLoader } from "./pages/DashboardLayout"
import { createJob } from "./pages/AddJob"
import { allJobsLoader } from "./pages/AllJobs"
import { getJobLoader, updateJobAction } from "./pages/EditJob"
import { deleteJobAction } from "./pages/DeleteJob"
import { AdminLoader } from "./pages/Admin"
import { updateUserAction } from "./pages/Profile"
import { StatsLoader } from "./pages/Stats"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ErrorElement from './components/ErrorElement'

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme
}
checkDefaultTheme()

// React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5
    }
  }
})

const router = createBrowserRouter([
  {path: '/', element: <HomeLayout/>, errorElement: <Error />, children: [
    {index: true, element: <Landing />},
    {path: 'register', element: <Register/>, action: registerAction},
    {path: 'login', element: <Login />, action: loginAction},
    {path: 'dashboard', element: <DashboardLayout />, loader: DashboardLoader, shouldRevalidate: () => true,
      children: [
      {index: true, element: <AddJob />, action: createJob},
      {path: 'stats', element: <Stats />, loader: StatsLoader},
      {path: 'all-jobs', element: <AllJobs />, loader: allJobsLoader},
      {path: 'profile', element: <Profile />, action: updateUserAction},
      {path: 'admin', element: <Admin />, loader: AdminLoader},
      {path: 'editJob/:id', element: <EditJob />, loader: getJobLoader, action: updateJobAction},
      {path: 'deleteJob/:id', action: deleteJobAction}
    ]},
  ]}
])

const App = () => {
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
}
export default App