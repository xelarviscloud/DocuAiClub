import CryptoJS from 'crypto-js'
import { jwtDecode } from 'jwt-decode'

/**
 * Format PhoneNumber: US Standard Format
 * @param {*} phone
 * @returns
 */
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

/**
 * Confirm Password Validator
 */
export function validateConfirmPassword(password, confirmPassword) {
  if (value !== values.password) {
    return 'Passwords do not match.'
  }

  return ''
}

/**
 * Password Validator
 */
export function validatePassword(value) {
  const minLength = 8
  const uppercaseRegex = /[A-Z]/
  const lowercaseRegex = /[a-z]/
  const numberRegex = /[0-9]/
  const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/

  if (
    value.length < minLength ||
    !uppercaseRegex.test(value) ||
    !lowercaseRegex.test(value) ||
    !numberRegex.test(value) ||
    !specialCharRegex.test(value)
  ) {
    return 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
  }
  return ''
}

/**
 *
 */

export const keydownValidNumberCheck = (e) => {
  const isValidKey = /[0-9]|Backspace|Delete/.test(e.key)
  if (!isValidKey) {
    e.preventDefault()
  }
}

/**
 * Page Tags: Key >> Key Display Name
 */

export const dicPageTagsDisplayName = {
  name: 'Name',
  confirmationNumber: 'Confirmation#',
  arrivalDate: 'Arrival Date',
  departureDate: 'Departure Date',
  createdDate: 'Created Date',
  content: 'Content',
  phone: 'Phone#',
}
