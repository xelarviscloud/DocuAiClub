import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CFormLabel,
  CCardImage,
  CCard,
  CCardHeader,
  CCardBody,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../../services/LoginService'
import Logo from '../../../assets/logo-bg-1.png'
import Background from '../../../assets/Register.png'
import toast from 'react-hot-toast'
import Spinners from '../../base/spinners/Spinners'
import { jwtDecode } from 'jwt-decode'
import { setCookie } from '../../../resources/utility'

function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({})
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
      setLoading(true)
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

          if (localStorage.getItem('token') && decoded?.role) {
            // assume user is logged in successful.
            navigate('/dashboard')
          }
          setLoading(false)
          setValues({})
          toast.success(response?.message)
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error)
          setLoading(false)
        })
    } else {
      setValidated(true)
    }
  }

  return (
    <>
      <CRow>
        <div
          style={{
            height: 60,
            width: '100%',
            backgroundImage: `url(${Background})`,
            backgroundSize: 'contain',
          }}
        ></div>

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
        </CCol>
      </CRow>
    </>
  )
}

export default Login
