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
import Spinners from '../../base/spinners/Spinners'
import { addOrganizationUser, getOrganizations } from '../../../services/OrganizationService'
import toast from 'react-hot-toast'

function RegisterOrgUser({ setOrgModal, secretKey, fetchOrgUser }) {
  const [values, setValues] = useState()
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
        setPasswordError(
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        )
      } else {
        setPasswordError('')
      }
    } else if (name === 'confirmPassword') {
      if (value !== values.password) {
        setConfirmPasswordError('Passwords do not match.')
      } else {
        setConfirmPasswordError('')
      }
    }
  }

  /**
   * ADD Organization User Api Calling
   */
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity() === false && !passwordError && !confirmPasswordError) {
      var formData = new FormData()
      formData.append('firstname', values?.firstName)
      formData.append('lastname', values?.lastName)
      formData.append('username', values?.username)
      formData.append('email', values?.email)
      formData.append('mobile_number', values?.mobile_number)
      formData.append('password', values?.password)
      formData.append('confirmPassword', values?.confirmPassword)
      formData.append('organizationId', values?.organizationid)
      formData.append('file', values?.file)
      setLoading(true)
      await addOrganizationUser({ body: formData })
        .then((response) => {
          toast.success(response?.message)
          setValues({
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            mobile_number: '',
            password: '',
            confirmPassword: '',
            organizationId: '',
            file: '',
          })

          fetchOrgUser()
          setOrgModal(false)
          setLoading(false)
        })
        .catch((error) => {
          console.log('err', error)
          toast.error(error?.response?.data?.error)
          setLoading(false)
        })
    } else {
      setValidated(true)
      e.stopPropagation()
    }
  }

  const handleNumberKeyDown = (e) => {
    // Allow only numbers (0-9) and backspace/delete key
    const isValidKey = /[0-9]|Backspace|Delete/.test(e.key)

    // If the key pressed is not valid, prevent the default action
    if (!isValidKey) {
      e.preventDefault()
    }
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Organization*</CFormLabel>
                    <CFormSelect
                      required
                      aria-describedby="validationOrganizationFeedback"
                      id="validationOrganization"
                      feedbackInvalid="Please select Organization"
                      type="text"
                      name="organizationid"
                      value={values?.organizationid}
                      onChange={(e) => handleOnChange(e)}
                    >
                      <option value="">Select Organization</option>
                      {orgList?.map((item) => (
                        <option value={item?.organizationid}>{item?.name}</option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
              </div>

              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">First Name*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="validationFirstNameFeedback"
                      id="validationFirstName"
                      feedbackInvalid="Please provide a first name"
                      type="text"
                      name="firstName"
                      placeholder="Enter Your First Name"
                      value={values?.firstname}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Last Name*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="validationLastNameFeedback"
                      id="validationLastName"
                      feedbackInvalid="Please provide a last name"
                      type="text"
                      name="lastName"
                      placeholder="Enter Your Last Name"
                      value={values?.lastname}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </CCol>
                </CRow>
              </div>

              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">User Name*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="validationUserNameFeedback"
                      id="validationUserName"
                      feedbackInvalid="Please provide a user name"
                      type="text"
                      name="username"
                      placeholder="Enter Your User Name"
                      value={values?.username}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Email*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="validationEmailFeedback"
                      id="validationEmail"
                      feedbackInvalid="Please provide a email"
                      type="email"
                      name="email"
                      pattern="^\S+@\S+\.\S+$"
                      placeholder="Enter Your Email"
                      value={values?.email}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Phone*</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText id="basic-addon1">+1</CInputGroupText>
                      <CFormInput
                        required
                        aria-describedby="validationPhoneFeedback"
                        id="validationPhone"
                        feedbackInvalid="Please provide a phone number"
                        type="text"
                        name="mobile_number"
                        placeholder="Enter Your Phone Number"
                        maxLength={10}
                        pattern="\d{10}"
                        value={values?.mobile_number}
                        onChange={(e) => handleOnChange(e)}
                        onKeyDown={handleNumberKeyDown}
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>
              </div>

              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Password*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="validationPasswordFeedback"
                      id="validationPassword"
                      feedbackInvalid={passwordError ? passwordError : 'Please provide a password'}
                      type="password"
                      name="password"
                      placeholder="Enter Your Password"
                      value={values?.password || 'Test@1234'}
                      onChange={(e) => handleOnChange(e)}
                      invalid={passwordError}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Confirm Password*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="validationConfirmPasswordFeedback"
                      id="validationConfirmPassword"
                      feedbackInvalid={
                        confirmPasswordError
                          ? confirmPasswordError
                          : 'Please provide a confirm password'
                      }
                      type="password"
                      name="confirmPassword"
                      placeholder="Enter Your Confirm Password"
                      value={values?.confirmPassword || 'Test@1234'}
                      onChange={(e) => handleOnChange(e)}
                      invalid={confirmPasswordError}
                    />
                  </CCol>
                </CRow>
              </div>

              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">User Image</CFormLabel>
                    <CFormInput
                      aria-describedby="validationFileFeedback"
                      id="validationFile"
                      feedbackInvalid="Please select a file"
                      type="file"
                      accept="image/*"
                      name="file"
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
                    onClick={() => setOrgModal(false)}
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

export default RegisterOrgUser
