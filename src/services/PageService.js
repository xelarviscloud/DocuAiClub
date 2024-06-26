import axiosHttp from './axiosHttp'
/**
 * GET: All Location by LocId
 */
export async function getPagesByLocationId(locationId) {
  const response = await axiosHttp.get(`/pages/location/${locationId}`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
  return response
}

export async function searchDocumentsByCriteria(searchCriteria) {
  console.log('searchCriteria', searchCriteria)
  let params = `?pageCount=${searchCriteria.pageCount}`
  params += `&departureDate=${searchCriteria.departureDate}`
  params += `&createdStartDate=${searchCriteria.createdStartDate}`
  params += `&createdEndDate=${searchCriteria.createdEndDate}`
  params += `&confirmationNumber=${searchCriteria.confirmationNumber}`
  params += `&status=${searchCriteria.status}`
  params += `&fileName=${searchCriteria.fileName}`
  params += `&locationId=${searchCriteria.locationId}`
  params += `&organizationId=${searchCriteria.organizationId}`

  const url = `/documents/search${params}`
  const response = await axiosHttp.get(url, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
  return response
}

export async function searchPagesByCriteria(searchCriteria) {
  console.log('searchCriteria', searchCriteria)
  let params = `?arrivalDate=${searchCriteria.arrivalDate}`
  params += `&departureDate=${searchCriteria.departureDate}`
  params += `&createdDate=${searchCriteria.createdDate}`
  params += `&confirmationNumber=${searchCriteria.confirmationNumber}`
  params += `&name=${searchCriteria.name}`
  params += `&content=${searchCriteria.content}`
  params += `&locationId=${searchCriteria.locationId}`
  params += `&organizationId=${searchCriteria.organizationId}`

  const url = `/pages/search${params}`
  const response = await axiosHttp.get(url, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
  return response
}

export async function shareDocument(criteria) {
  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  }
  return axiosHttp.post(`/document/shareDocument`, criteria, config)
}

export async function sharePage(criteria) {
  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  }
  return axiosHttp.post(`/pages/sharePage`, criteria, config)
}

export async function sendTestEmail() {
  const config = {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  }
  return axiosHttp.post(`/document/sendTestEmail`, {}, config)
}
