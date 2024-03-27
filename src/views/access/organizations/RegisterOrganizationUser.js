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
import toast from 'react-hot-toast'
import {
  addOrganizationUser,
  getOrganizations,
  updateOrganizationUser,
} from '../../../services/OrganizationService'
import {
  keydownValidNumberCheck,
  validateConfirmPassword,
  validatePassword,
} from '../../../services/Utility'
import Spinners from '../../base/spinners/Spinners'

function RegisterOrganizationUser({
  setModal,
  secretKey,
  fetchOrgUser,
  editData,
  isEditUser = false,
}) {
  editData.password = ''
  editData.confirmPassword = ''

  const [values, setValues] = useState(editData)
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [orgList, setOrgList] = useState([])
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  useEffect(() => {
    fetchOrganizations()
  }, [])

  const fetchOrganizations = async () => {
    await getOrganizations({ currentPage: '' })
      .then((response) => {
        setOrgList(response?.data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

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
      formData.append('organizationId', values?.userOrganizationId)
      formData.append('file', values?.file)

      setLoading(true)
      let func = isEditUser
        ? updateOrganizationUser({ body: formData })
        : addOrganizationUser({ body: formData })

      await func
        .then((response) => {
          toast.success(response?.message)
          setValues({})

          fetchOrgUser()
          setModal(false)
          setLoading(false)
        })
        .catch((error) => {
          console.log('err', error)
          toast.error(error?.response?.data?.error)
          setLoading(false)
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
            <strong>Add New Organization Admin</strong>
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
                    <CFormLabel htmlFor="userOrganizationId">Organization*</CFormLabel>
                    <CFormSelect
                      required
                      aria-describedby="userOrganizationId"
                      id="userOrganizationId"
                      feedbackInvalid="Please select Organization"
                      type="text"
                      name="userOrganizationId"
                      value={values?.userOrganizationId}
                      onChange={(e) => handleOnChange(e)}
                      disabled={editData?.userOrganizationId}
                      key={editData._id}
                    >
                      <option value="">Select Organization</option>
                      {orgList?.map((item) => (
                        <option key={item?.organizationId} value={item?.organizationId}>
                          {item?.organizationName}
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
                      feedbackInvalid="Please provide Last Name"
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
                      disabled={editData?.userOrganizationId}
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
                        feedbackInvalid="Please provide Phone Number"
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
                    <CFormLabel htmlFor="fileUrl">User Image</CFormLabel>
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
                <CTooltip content="Submit Organization Admin" placement="bottom">
                  <CButton
                    color="primary"
                    type="submit"
                    style={{ float: 'right', marginRight: 10, display: 'flex' }}
                  >
                    Submit
                    {loading && (
                      <div className="clearfix">
                        <Spinners className="float-end" />
                      </div>
                    )}
                  </CButton>
                </CTooltip>
                <CTooltip content="Close Organization Admin Form" placement="bottom">
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

export default RegisterOrganizationUser
