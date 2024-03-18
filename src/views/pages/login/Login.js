import React from 'react'
import { CButton, CCol, CForm, CFormInput, CRow, CFormLabel, CCardImage } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../../services/LoginService'
import setCookie from '../../../resources/utility'
// import Background from '../../../assets/login-bg.jpg'
import Logo from '../../../assets/logo-bg-1.png'
import Background from '../../../assets/Register.png'
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
      <CCol
        xs={7}
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: 'fit',
          backgroundRepeat: 'no-repeat',
        }}
        className="min-vh-100 d-flex flex-row align-items-center  justify-content-center"
      >
        <div style={{ margin: 50 }} className="bg-before">
          <CCardImage
            orientation="top"
            src={Logo}
            style={{
              borderRadius: '100%',
              width: 120,
              left: '19%',
              marginTop: 5,
            }}
          />
          <h1>DocuAi Club</h1>
          <h5>Restaging Documents</h5>
        </div>
      </CCol>
      <CCol
        xs={5}
        className="min-vh-100 d-flex flex-row align-items-center  justify-content-center"
      >
        <div style={{ position: 'relative' }} className="align-items-center">
          <CForm style={{ border: '1px solid', borderRadius: 5, padding: 25 }}>
            <h4 style={{ color: '#023b6d !important' }}>Sign In.</h4>

            <div className="mb-3">
              <CFormLabel htmlFor="Username">User Name</CFormLabel>
              <CFormInput size="lg" placeholder="Username" autoComplete="username" />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="Password">Password</CFormLabel>
              <CFormInput
                size="lg"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
            </div>
            <CRow>
              <CCol xs={5}>
                <CButton color="primary" className="px-4" onClick={(e) => handleLogin(e)}>
                  Login
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
  )
}

export default Login
