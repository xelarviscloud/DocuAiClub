import axiosHttp from './axiosHttp'

export async function createAlert(body) {
  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
      'content-type': 'application/x-www-form-urlencoded',
    },
  }

  return await axiosHttp.post(`/alerts`, body, config)
}

export async function getAlerts(body) {
  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    params: body,
  }

  return await axiosHttp.get(`/alerts`, config)
}
