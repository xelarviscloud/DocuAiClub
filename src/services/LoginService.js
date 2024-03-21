import axios from 'axios'

// Login Api
export async function userLogin(body) {
  try {
    const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/user/login`, body)
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
    const response = await axios.post(`${process.env.REACT_APP_LOCAL_URL}/verification`, body, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
