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
