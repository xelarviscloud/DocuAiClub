import React from 'react'
import { CButton, CCol, CForm, CFormInput, CRow, CFormLabel, CCardImage } from '@coreui/react'
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
            <h4 className="text-body-secondary">Sign In.</h4>

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
        }}
        className="min-vh-100 d-block align-items-center"
      >
        <div style={{ margin: 50 }} className="bg-before">
          <h1 style={{ color: '#1b2f45' }}>Focus on What Matters!</h1>
          <div style={{ background: '#f7f9fc', padding: 5 }}>
            <h5>Property(s) Documents in central place</h5>
            <h5>Multi Locations and Users Access Support</h5>
            <h5>Intelligent Document Search</h5>
            <h5>Fight Charge Back with finding proper documentation</h5>
            <h5>Training and Quality Document Storage and easy Sharing</h5>
          </div>
        </div>
        <div style={{ margin: 50 }} className="bg-before">
          <h1>Coming Soon</h1>
          <div style={{ background: '#f7f9fc', padding: 5 }}>
            <h4>Maintenance Module</h4>
            <h4>Expense Tracker Module</h4>
          </div>
        </div>
      </CCol>
    </CRow>
  )
}

export default Login
