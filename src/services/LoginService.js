import axiosHttp from './axiosHttp'
// Login Api
export async function userLogin(body) {
  try {
    const response = await axiosHttp.post(`/user/login`, body)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * VERIFY EMAIL
 */
export async function addVerifyEmail(body) {
  try {
    const response = await axiosHttp.post(`/verification`, body, {
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
 * UPDATE USER PROFILE
 */
export async function updateUserProfile(body) {
  return await axiosHttp.put(`/user/updateUserProfile`, body, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
}

/**
 * CHANGE PASSWORD
 */
export async function changePassword(body) {
  return await axiosHttp.put(`/user/changePassword`, body, {
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
}
