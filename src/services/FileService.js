import axios from 'axios'

export async function uploadFile(body) {
  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  }
  return axios.post(`${process.env.REACT_APP_LOCAL_URL}/file`, body, config)
}
