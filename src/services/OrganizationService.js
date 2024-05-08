import axiosHttp from './axiosHttp'

/**
 * GOOD
 * GET: Organization (details)
 */

export async function getOrganization({ organizationId = organizationId }) {
  try {
    const response = await axiosHttp.get(`/organization/get/${organizationId}`, {
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
 * GOOD
 * GET: All Organizations
 */
export async function getOrganizations({
  currentPage: currentPage,
  searchName: searchName,
  pageSize = 10,
}) {
  try {
    const response = await axiosHttp.get(
      `/organizations/get?page=${currentPage}&pageSize=${pageSize}`,
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
 * GOOD
 * POST: Add an Organization
 */

export async function addOrganization({ body: body }) {
  try {
    const response = await axiosHttp.post(`/organization/add`, body, {
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
 * GOOD
 * PUT: Edit Organizations
 */

export async function editOrganization({ id: id, body: body }) {
  try {
    const response = await axiosHttp.put(`/organization/edit/${id}`, body, {
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
 * GOOD
 * GET: Organization Users
 */
export async function getOrganizationUsers({
  currentPage: currentPage,
  pageSize = 10,
  organizationId,
}) {
  try {
    const response = await axiosHttp.get(
      `/organizationUsers?page=${currentPage}&pageSize=${pageSize}&organizationId=${organizationId}`,
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
 * GOOD
 * POST: Add Org User
 */
export async function addOrganizationUser({ body: body }) {
  try {
    const response = await axiosHttp.post(`/organizationUser`, body, {
      headers: {
        Authorization: localStorage.getItem('token'),
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * WIP
 * PUT: Update Org User
 */
export async function updateOrganizationUser({ body: body }) {
  try {
    const response = await axiosHttp.put(`/organizationUser`, body, {
      headers: {
        Authorization: localStorage.getItem('token'),
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
