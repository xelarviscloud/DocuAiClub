import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTooltip,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { addLocationUser, updateLocationUser } from '../../../services/LocationService'
import {
  keydownValidNumberCheck,
  validateConfirmPassword,
  validatePassword,
} from '../../../services/Utility'

import toast from 'react-hot-toast'

function RegisterLocationUser({
  setModal,
  editData,
  locationList,
  refreshLocationUsers,
  isEditUser = false,
}) {
  editData.password = ''
  editData.confirmPassword = ''

  const [values, setValues] = useState(editData)
  const [validated, setValidated] = useState(false)

  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  useEffect(() => {}, [])

  const handleOnChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'file') {
      setValues({ ...values, [name]: files[0] })
    } else {
      setValues({
        ...values,
        [name]: value,
      })
    }

    if (name === 'password') {
      setPasswordError(validatePassword(value))
    }

    if (name === 'confirmPassword') {
      setConfirmPasswordError(validateConfirmPassword(value, values.password))
    }
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const form = e.currentTarget
    if (!form.checkValidity() === false && !passwordError && !confirmPasswordError) {
      var formData = new FormData()
      formData.append('firstName', values?.firstName)
      formData.append('lastName', values?.lastName)
      formData.append('userName', values?.userName)
      formData.append('emailAddress', values?.emailAddress)
      formData.append('phoneNumber', values?.phoneNumber)
      formData.append('password', values?.password)
      formData.append('confirmPassword', values?.confirmPassword)
      formData.append('locationId', values?.userLocationId)
      formData.append('organizationId', values.organizationId)
      formData.append('file', values?.file)

      let func = isEditUser
        ? updateLocationUser({ body: formData })
        : addLocationUser({ body: formData })

      await func
        .then((response) => {
          toast.success(response?.message)
          setValues({})
          setModal(false)
          refreshLocationUsers()
        })
        .catch((error) => {
          console.log('err', error)
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
            <strong>Add New Property Admin</strong>
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
                    <CFormLabel htmlFor="userLocationId">Parent Property*</CFormLabel>
                    <CFormSelect
                      required
                      aria-describedby="userLocationId"
                      id="userLocationId"
                      feedbackInvalid="Please select Parent Location"
                      type="text"
                      name="userLocationId"
                      value={values?.userLocationId}
                      onChange={(e) => handleOnChange(e)}
                      disabled={editData?.userLocationId}
                    >
                      <option value="">Select Property</option>
                      {locationList?.map((item) => (
                        <option key={item?.locationId} value={item?.locationId}>
                          {item?.locationName}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
              </div>

              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="firstName">First Name*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="firstName"
                      id="firstName"
                      feedbackInvalid="Please provide First Name"
                      type="text"
                      name="firstName"
                      placeholder="Enter Your First Name"
                      value={values?.firstName}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="lastName">Last Name*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="lastName"
                      id="lastName"
                      feedbackInvalid="Please provide a Last Name"
                      type="text"
                      name="lastName"
                      placeholder="Enter Your Last Name"
                      value={values?.lastName}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </CCol>
                </CRow>
              </div>

              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="userName">User Name*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="userName"
                      id="userName"
                      feedbackInvalid="Please provide Username"
                      type="text"
                      name="userName"
                      placeholder="Enter Your User Name"
                      value={values?.userName}
                      onChange={(e) => handleOnChange(e)}
                      disabled={editData?.userName?.length}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="emailAddress">Email*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="emailAddress"
                      id="emailAddress"
                      feedbackInvalid="Please provide an Email Address"
                      type="email"
                      name="emailAddress"
                      pattern="^\S+@\S+\.\S+$"
                      placeholder="Enter Your Email"
                      value={values?.emailAddress}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="phoneNumber">Phone*</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText id="basic-addon1">+1</CInputGroupText>
                      <CFormInput
                        required
                        aria-describedby="phoneNumber"
                        id="phoneNumber"
                        feedbackInvalid="Please provide a Phone Number"
                        type="text"
                        name="phoneNumber"
                        placeholder="Enter Your Phone Number"
                        maxLength={10}
                        pattern="\d{10}"
                        value={values?.phoneNumber}
                        onChange={(e) => handleOnChange(e)}
                        onKeyDown={keydownValidNumberCheck}
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>
              </div>

              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="password">Password*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="password"
                      id="password"
                      feedbackInvalid={passwordError ? passwordError : 'Please provide a Password'}
                      type="password"
                      name="password"
                      minLength={8}
                      placeholder="Enter Your Password"
                      value={values?.password}
                      onChange={(e) => handleOnChange(e)}
                      invalid={passwordError}
                      autoComplete="new-password"
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="confirmPassword">Confirm Password*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="confirmPassword"
                      id="confirmPassword"
                      feedbackInvalid={
                        confirmPasswordError
                          ? confirmPasswordError
                          : 'Please provide Confirm Password'
                      }
                      type="password"
                      name="confirmPassword"
                      minLength={8}
                      placeholder="Enter Your Confirm Password"
                      value={values?.confirmPassword}
                      onChange={(e) => handleOnChange(e)}
                      invalid={confirmPasswordError}
                    />
                  </CCol>
                </CRow>
              </div>

              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="fileUrl">File</CFormLabel>
                    <CFormInput
                      aria-describedby="fileUrl"
                      id="fileUrl"
                      feedbackInvalid="Please select User Image"
                      type="file"
                      accept="image/*"
                      name="fileUrl"
                      onChange={(e) => handleOnChange(e)}
                    />
                  </CCol>
                </CRow>
              </div>

              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    {values?.file && (
                      <img
                        src={values?.file ? URL.createObjectURL(values?.file) : ''}
                        alt="file"
                        style={{ width: 100, height: 100 }}
                      />
                    )}
                  </CCol>
                </CRow>
              </div>

              <div className="mb-3">
                <CTooltip content="Submit Property Admin" placement="bottom">
                  <CButton
                    color="primary"
                    type="submit"
                    style={{ float: 'right', marginRight: 10, display: 'flex' }}
                  >
                    Submit
                  </CButton>
                </CTooltip>
                <CTooltip content="Close Property Admin Form" placement="bottom">
                  <CButton
                    color="secondary"
                    style={{ float: 'right', marginRight: 10, display: 'flex' }}
                    onClick={() => setModal(false)}
                  >
                    Cancel
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

export default RegisterLocationUser
