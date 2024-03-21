import axios from 'axios'

/**
 * GET Organizations
 * SYSTEM ADMIN will access all Organizations
 */

export async function getOrganizations({
  currentPage: currentPage,
  searchName: searchName,
  pageSize = 10,
}) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/organization/get?page=${currentPage}&pageSize=${pageSize}`,
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
 * SEARCH Organizations
 * SYSTEM ADMIN will access all Organizations
 */

export async function searchOrganizations({
  currentPage: currentPage,
  searchName: searchName,
  pageSize = 10,
}) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/organizationlist/get?page=${currentPage}&pageSize=${pageSize}`,
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
 * ADD Organizations
 * SYSTEM ADMIN will access all Organizations
 */

export async function addOrganization({ body: body }) {
  try {
    const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/organization/add`, body, {
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
 * EDIT Organizations
 * SYSTEM ADMIN will access all Organizations
 */

export async function editOrganization({ id: id, body: body }) {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_LOCAL_URL}/organization/edit/${id}`,
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
 * GET Organization User
 * SYSTEM ADMIN will access all Organization User
 */
export async function getOrganizationUser({ currentPage: currentPage, pageSize = 10 }) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_LOCAL_URL}/organization/user/get?page=${currentPage}&pageSize=${pageSize}`,
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
 * ADD Organization User
 * SYSTEM ADMIN will access all Organization User
 */
export async function addOrganizationUser({ body: body }) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_LOCAL_URL}/organization/user/add`,
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
