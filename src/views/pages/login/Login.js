import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormLabel,
  CCardImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../../services/LoginService'
import setCookie from '../../../resources/utility'
import Background from '../../../assets/login-bg.jpg'
import Logo from '../../../assets/logo-bg-1.png'
const Login = () => {
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    // Let's get user logged in here.
    const credentials = {
      email: 'vishal@gmail.com',
      password: '12345678',
    }
    // Let's call an Login API.
    let result = await userLogin(credentials).then((response) => {
      setCookie('token', response?.accessToken, 24)
      localStorage.setItem('token', response?.accessToken)
    })
    // assume user is logged in successful.
    navigate('/dashboard')
  }
  return (
    <CRow>
      <CCol xs={5} className="min-vh-100 d-flex flex-row  justify-content-center">
        <div style={{ position: 'relative' }} className="align-items-center">
          <CCardImage
            orientation="top"
            // className="coin"
            src={Logo}
            style={{
              borderRadius: '100%',
              width: 120,
              left: '19%',
              top: 270,
            }}
          />
          <h1>DocuAi Club</h1>
          <h5>Restaging Documents</h5>
          <CForm style={{ marginTop: 60 }}>
            <h3 className="text-body-secondary">Sign In.</h3>

            <div className="mb-3">
              {/* <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText> */}
              <CFormLabel htmlFor="Username">User Name</CFormLabel>
              <CFormInput size="lg" placeholder="Username" autoComplete="username" />
            </div>
            <div className="mb-3">
              {/* <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText> */}
              <CFormLabel htmlFor="Password">Password</CFormLabel>
              <CFormInput
                size="lg"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
            </div>
            <CRow>
              <CCol xs={6}>
                <CButton color="primary" className="px-4" onClick={(e) => handleLogin(e)}>
                  Login
                </CButton>
              </CCol>
              <CCol xs={6} className="text-right">
                <CButton color="link" className="px-0">
                  Forgot password?
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </div>
      </CCol>
      <CCol
        xs={7}
        style={{
          backgroundImage: `url(${Background})`,
          backgroundColor: '#ffffff99',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.9,
        }}
        className="min-vh-100 d-flex flex-row align-items-center justify-content-center"
      >
        <div style={{ opacity: 1 }}>
          {/* <h1 style={{ color: '#222222' }}>Restaging Document Storage</h1> */}
        </div>
      </CCol>
    </CRow>
  )
}

export default Login
