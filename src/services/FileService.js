import axios from 'axios'

export async function uploadFile(body) {
  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  }
  return axios.post(`${process.env.REACT_APP_LOCAL_URL}/file`, body, config)
}

export async function getDocumentsByLocationId(locationId) {
  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  }
  return axios.get(`${process.env.REACT_APP_LOCAL_URL}/documents/location/${locationId}`, config)
}
