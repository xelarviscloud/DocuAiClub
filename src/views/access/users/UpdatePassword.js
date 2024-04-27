import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CTooltip,
} from '@coreui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { changePassword } from '../../../services/LoginService'
import { validateConfirmPassword, validatePassword } from '../../../services/Utility'

function UpdatePassword() {
  const [values, setValues] = useState({
    userName: '',
    currentPassword: '',
    newPassword: '',
    newConfirmedPassword: '',
  })
  const [validated, setValidated] = useState(false)
  const [currentPasswordError, setCurrentPasswordError] = useState('')
  const [newPasswordError, setNewPasswordError] = useState('')
  const [newConfirmedPasswordError, setNewConfirmedPasswordError] = useState('')
  const navigate = useNavigate()

  let userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })

    if (name === 'newPassword') {
      setNewPasswordError(validatePassword(value))
    }

    if (name === 'newConfirmedPassword') {
      setNewConfirmedPasswordError(validateConfirmPassword(value, values.newPassword))
    }
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (
      !form.checkValidity() === false &&
      !currentPasswordError &&
      !newPasswordError &&
      !newConfirmedPasswordError
    ) {
      var formData = new FormData()
      formData.append('userName', userInfo?.userName)
      formData.append('currentPassword', values?.currentPassword)
      formData.append('newPassword', values?.newPassword)
      formData.append('newConfirmedPassword', values?.newConfirmedPassword)

      let func = changePassword(formData)

      await func
        .then((response) => {
          toast.success(response?.data?.message)
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error)
        })
      return
    }

    setValidated(true)
    e.stopPropagation()
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Change Password</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleOnSubmit}
            >
              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="currentPassword">Current Password*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="currentPassword"
                      id="currentPassword"
                      feedbackInvalid={
                        currentPasswordError
                          ? currentPasswordError
                          : 'Please provide a Current Password'
                      }
                      type="password"
                      name="currentPassword"
                      minLength={8}
                      placeholder="Enter Your Current Password"
                      value={values?.currentPassword}
                      onChange={(e) => handleOnChange(e)}
                      invalid={currentPasswordError?.length > 0}
                      autoComplete="current-password"
                    />
                  </CCol>
                </CRow>
              </div>
              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="newPassword">New Password*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="newPassword"
                      id="newPassword"
                      feedbackInvalid={
                        newPasswordError ? newPasswordError : 'Please provide New Password'
                      }
                      type="password"
                      name="newPassword"
                      minLength={8}
                      placeholder="Enter Your New Password"
                      value={values?.newPassword}
                      onChange={(e) => handleOnChange(e)}
                      invalid={newPasswordError?.length > 0}
                    />
                  </CCol>
                </CRow>
              </div>
              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="newConfirmedPassword">Confirm New Password*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="newConfirmedPassword"
                      id="newConfirmedPassword"
                      feedbackInvalid={
                        newConfirmedPasswordError
                          ? newConfirmedPasswordError
                          : 'Please provide Confirm New Password'
                      }
                      type="password"
                      name="newConfirmedPassword"
                      minLength={8}
                      placeholder="Enter Your Confirm New Password"
                      value={values?.newConfirmedPassword}
                      onChange={(e) => handleOnChange(e)}
                      invalid={newConfirmedPasswordError?.length > 0}
                    />
                  </CCol>
                </CRow>
              </div>
              <div className="mb-3">
                <CTooltip content="Change Password" placement="bottom">
                  <CButton
                    color="primary"
                    type="submit"
                    style={{ float: 'right', marginRight: 10, display: 'flex' }}
                  >
                    Submit
                  </CButton>
                </CTooltip>
                <CTooltip content="Close" placement="bottom">
                  <CButton
                    color="secondary"
                    style={{ float: 'right', marginRight: 10, display: 'flex' }}
                    onClick={() => navigate('/dashboard')}
                  >
                    Close
                  </CButton>
                </CTooltip>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UpdatePassword
