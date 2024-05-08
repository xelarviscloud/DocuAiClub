import axiosHttp from './axiosHttp'

/**
 * GET: All Location by LocId
 */
export async function getLocation({ locationId: locationId }) {
  try {
    const response = await axiosHttp.get(`/location/get/${locationId}`, {
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
 * GET: All Locations by OrgId
 */
export async function getLocations({
  organizationId: organizationId,
  currentPage: currentPage,
  searchName: searchName,
  pageSize = 10,
}) {
  try {
    const response = await axiosHttp.get(
      `/locations/get?organizationId=${organizationId}&page=${currentPage}&pageSize=${pageSize}`,
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
 * ADD: Location
 */
export async function addLocation({ body: body }) {
  try {
    const response = await axiosHttp.post(`/location/add`, body, {
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
 * EDIT: Location
 */
export async function updateLocation({ id: id, body: body }) {
  try {
    const response = await axiosHttp.put(`/location/edit/${id}`, body, {
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
 * GET Location Users by LocationId
 */
export async function getLocationUsers({
  locationId: locationId,
  organizationId: organizationId,
  currentPage: currentPage,
  pageSize = 10,
}) {
  try {
    const response = await axiosHttp.get(
      `/locationUsers?page=${currentPage}&pageSize=${pageSize}&locationId=${locationId}&organizationId=${organizationId}`,
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
 * POST: Location User
 */
export async function addLocationUser({ body: body }) {
  try {
    const response = await axiosHttp.post(`/locationUser`, body, {
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
 * PUT: Location User
 */
export async function updateLocationUser({ body: body }) {
  try {
    const response = await axiosHttp.put(`/locationUser`, body, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
