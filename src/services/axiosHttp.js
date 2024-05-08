import axios from 'axios'
import 'dotenv/config'
dotenv.config()
const axiosHttp = axios.create({
  baseURL: `${process.env.REACT_APP_LOCAL_URL}`,
})

axiosHttp.interceptors.request.use((config) => {
  window.localStorage.setItem('spinner-state', '1')
  window.dispatchEvent(new Event('storage'))
  return config
})

axiosHttp.interceptors.response.use(
  (response) => {
    window.localStorage.setItem('spinner-state', '0')
    window.dispatchEvent(new Event('storage'))
    return response
  },
  (error) => {
    window.localStorage.setItem('spinner-state', '0')
    window.dispatchEvent(new Event('storage'))
    return Promise.reject(error)
  },
)
export default axiosHttp
