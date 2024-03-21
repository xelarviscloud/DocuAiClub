import { jwtDecode } from 'jwt-decode'
import CryptoJS from 'crypto-js'

const formatPhoneNumber = (phone) => {
  if (phone && phone.length == 10 && !isNaN(phone))
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
  else return phone
}

export default formatPhoneNumber

/**
 * TOKEN Decode
 */
export async function useTokenDecode() {
  try {
    const token = localStorage.getItem('token')
    const decodedToken = await jwtDecode(token)
    return decodedToken
  } catch (error) {
    return null
  }
}

/**
 * DECRYPT URL logic
 */
export function decryptData(secretKey) {
  const encryptedData = `${process.env.REACT_APP_LOCAL_FILE_URL}`
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey)
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    return decryptedData
  } catch (error) {
    console.error('Error decrypting data:', error)
    return null
  }
}
