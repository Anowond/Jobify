import { toast } from "react-toastify"

const handleAPIErrors = err => {
    const response = err?.response?.data
          if (response.errors) {response.errors.forEach(error => toast.error(error))}
          if (response.error) {toast.error(response.error)}
}

export default handleAPIErrors