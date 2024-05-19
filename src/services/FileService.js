import axiosHttp from './axiosHttp'

export async function uploadFile(body) {
  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  }
  return axiosHttp.post(`/file/upload`, body, config)
}

export async function downloadFile(blobPath) {
  const config = {
    responseType: 'blob',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  }
  console.log('blobPath', blobPath)
  return axiosHttp.get(`/blob/downloadPdf?blobPath=${encodeURIComponent(blobPath)}`, config)
}

export async function getDocumentsByLocationId(locationId) {
  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  }
  return axiosHttp.get(`/documents/location/${locationId}`, config)
}
