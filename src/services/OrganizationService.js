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
    const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/organization/get`, {
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
 * SEARCH Organizations
 * SYSTEM ADMIN will access all Organizations
 */

export async function searchOrganizations({
  currentPage: currentPage,
  searchName: searchName,
  pageSize = 10,
}) {
  try {
    console.log('get Organzations: Get Token', localStorage.getItem('token'))

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
