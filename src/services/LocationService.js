import axios from 'axios'

/**
 * GET Locations
 * SYSTEM ADMIN will access all Locations
 */
export async function getLocations({
  organizationId: organizationId,
  currentPage: currentPage,
  searchName: searchName,
  pageSize = 10,
}) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/locations/get?organizationId=${organizationId}&page=${currentPage}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    )
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * ADD Locations
 * SYSTEM ADMIN will access all Locations
 */
export async function addLocation({ body: body }) {
  try {
    const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/location/add`, body, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * EDIT Locations
 * SYSTEM ADMIN will access all Locations
 */
export async function editLocation({ id: id, body: body }) {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_LOCAL_URL}/location/edit/${id}`,
      body,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    )
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * GET Location User
 * SYSTEM ADMIN will access all Location User
 */
export async function getLocationUsers({
  locationId: locationId,
  organizationId: organizationId,
  currentPage: currentPage,
  pageSize = 10,
}) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/locationUsers?page=${currentPage}&pageSize=${pageSize}&locationId=${locationId}&organizationId=${organizationId}`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    )
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * ADD Location User
 * SYSTEM ADMIN will access all Location User
 */
export async function addLocationUser({ body: body }) {
  try {
    const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/locationUser`, body, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
