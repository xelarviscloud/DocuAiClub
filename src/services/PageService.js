import axios from 'axios'

/**
 * GET: All Location by LocId
 */
export async function getPagesByLocationId(locationId) {
  const response = await axios.get(
    `${process.env.REACT_APP_LOCAL_URL}/pages/location/${locationId}`,
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  )
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

  const url = `${process.env.REACT_APP_LOCAL_URL}/pages/search${params}`
  const response = await axios.get(url, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
  return response
}
