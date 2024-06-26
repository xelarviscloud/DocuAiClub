import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import { jwtDecode } from 'jwt-decode'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Logo from '../../../assets/logo-bg-1.png'
import { setCookie } from '../../../resources/utility'
import { userLogin } from '../../../services/LoginService'
import Spinners from '../../base/spinners/Spinners'

function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ userName: '', password: '' })
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity() === false) {
      // Let's get user logged in here.
      const credentials = {
        username: values?.username,
        password: values?.password,
      }
      // Let's call an Login API.
      let result = await userLogin(credentials)
        .then((response) => {
          const decoded = jwtDecode(response?.accessToken)
          setCookie('token', response?.accessToken, 24)
          localStorage.setItem('token', response?.accessToken)
          localStorage.setItem('userInfo', JSON.stringify(response?.userInfo))
          if (localStorage.getItem('token') && decoded?.role) {
            navigate('/dashboard')
          }
          setValues({})
          toast.success(response?.message)
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error)
        })
    } else {
      setValidated(true)
    }
  }

  return (
    <>
      <CRow style={{ background: '#eff6ff' }}>
        <CCol xs={12} className="d-flex flex-row align-items-center  justify-content-center">
          <div style={{ marginTop: 60 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 40,
              }}
            >
              <CCardImage
                src={Logo}
                style={{
                  width: 80,
                  alignSelf: 'stretch',
                  borderRadius: 3,
                }}
              />
            </div>
            <CForm noValidate validated={validated} onSubmit={handleLogin}>
              <h4 style={{ color: '#023b6d !important' }}>Sign In.</h4>
              <div className="mb-3">
                <CFormLabel htmlFor="Username">User Name</CFormLabel>
                <CFormInput
                  size="lg"
                  placeholder="Username"
                  name="username"
                  value={values?.email}
                  onChange={(e) => handleOnChange(e)}
                  aria-describedby="validationEmail"
                  id="validationEmail"
                  feedbackInvalid="Please provide a username."
                  required
                  style={{ borderRadius: '0' }}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Password">Password</CFormLabel>
                <CFormInput
                  size="lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values?.password}
                  onChange={(e) => handleOnChange(e)}
                  aria-describedby="validationPassword"
                  id="validationPassword"
                  feedbackInvalid="Please provide a password."
                  required
                  style={{ borderRadius: '0' }}
                />
              </div>
              <CRow>
                <CCol xs={5}>
                  <CButton
                    color="primary"
                    type="submit"
                    className="px-4"
                    style={{ display: 'flex', marginRight: '4px' }}
                  >
                    Login
                    {loading && (
                      <div className="clearfix">
                        <Spinners className="float-end" />
                      </div>
                    )}
                  </CButton>
                </CCol>
                <CCol xs={7} className="text-right">
                  <CButton color="link" className="px-0">
                    Forgot password?
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol
          style={{ marginTop: 30 }}
          className="d-flex  align-items-center  justify-content-center"
        >
          <CCard style={{ margin: 5 }}>
            <CCardBody>Documents</CCardBody>
          </CCard>
          <CCard style={{ margin: 5 }}>
            <CCardBody>Ai</CCardBody>
          </CCard>
          <CCard style={{ margin: 5 }}>
            <CCardBody>Search</CCardBody>
          </CCard>
          <CCard style={{ margin: 5 }}>
            <CCardBody>Version</CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Login
