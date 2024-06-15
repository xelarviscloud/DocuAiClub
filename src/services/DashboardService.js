import axiosHttp from './axiosHttp'

export async function getDashboardDocuments(orgId, locId) {
  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  }
  return axiosHttp.get(`/documents/dashboard/${orgId}/${locId}`, config)
}
