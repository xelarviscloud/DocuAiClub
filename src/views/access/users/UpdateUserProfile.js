import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTooltip,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { keydownValidNumberCheck } from '../../../services/Utility'
import { useNavigate } from 'react-router-dom'
import { updateUserProfile } from '../../../services/LoginService'
function UpdateUserProfile() {
  const [values, setValues] = useState({
    emailAddress: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    userName: '',
  })
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()
  let decodedToken = JSON.parse(localStorage.getItem('userInfo'))
  useEffect(() => {
    let { emailAddress, firstName, lastName, phoneNumber, userName } = decodedToken
    setValues({
      emailAddress,
      firstName,
      lastName,
      phoneNumber,
      userName,
    })
  }, [])

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
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity() === false) {
      var formData = new FormData()
      formData.append('firstName', values?.firstName)
      formData.append('lastName', values?.lastName)
      formData.append('userName', values?.userName)
      formData.append('emailAddress', values?.emailAddress)
      formData.append('phoneNumber', values?.phoneNumber)
      formData.append('file', values?.file)

      let func = updateUserProfile(formData)

      await func
        .then((response) => {
          decodedToken.emailAddress = values?.emailAddress
          decodedToken.firstName = values?.firstName
          decodedToken.lastName = values?.lastName
          decodedToken.phoneNumber = values?.phoneNumber

          localStorage.setItem('userInfo', JSON.stringify(decodedToken))
          window.dispatchEvent(new Event('userInfo'))
          toast.success(response.data?.message)
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
            <strong>Profile</strong>
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
                      disabled={true}
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
                <CTooltip content="Update Profile" placement="bottom">
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

export default UpdateUserProfile
