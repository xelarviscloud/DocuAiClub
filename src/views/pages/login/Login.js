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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../../services/LoginService'
import setCookie from '../../../resources/utility'

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
      <CCol xs={5} className="min-vh-100 d-flex flex-row align-items-center justify-content-center">
        <div>
          <CCard>
            <CCardBody>
              <CForm>
                <h1>Login</h1>
                <p className="text-body-secondary">Sign In to your account</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput size="lg" placeholder="Username" autoComplete="username" />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    size="lg"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                </CInputGroup>
                <CRow>
                  <CCol xs={6}>
                    <CButton color="success" className="px-4" onClick={(e) => handleLogin(e)}>
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
            </CCardBody>
          </CCard>
        </div>
      </CCol>
      <CCol xs={7} style={{ backgroundColor: '#e5eff7' }}></CCol>
    </CRow>
    // <div
    //   className="min-vh-100 d-flex flex-row align-items-center"
    //   style={{ backgroundColor: 'white' }}
    // >
    //   <CContainer>
    //     <CRow>
    //       <CCol xs={4}>
    //         <CCard>
    //           <CCardBody>
    //             <CForm>
    //               <h1>Login</h1>
    //               <p className="text-body-secondary">Sign In to your account</p>
    //               <CInputGroup className="mb-3">
    //                 <CInputGroupText>
    //                   <CIcon icon={cilUser} />
    //                 </CInputGroupText>
    //                 <CFormInput placeholder="Username" autoComplete="username" />
    //               </CInputGroup>
    //               <CInputGroup className="mb-4">
    //                 <CInputGroupText>
    //                   <CIcon icon={cilLockLocked} />
    //                 </CInputGroupText>
    //                 <CFormInput
    //                   type="password"
    //                   placeholder="Password"
    //                   autoComplete="current-password"
    //                 />
    //               </CInputGroup>
    //               <CRow>
    //                 <CCol xs={6}>
    //                   <CButton color="success" className="px-4" onClick={(e) => handleLogin(e)}>
    //                     Login
    //                   </CButton>
    //                 </CCol>
    //                 <CCol xs={6} className="text-right">
    //                   <CButton color="link" className="px-0">
    //                     Forgot password?
    //                   </CButton>
    //                 </CCol>
    //               </CRow>
    //             </CForm>
    //           </CCardBody>
    //         </CCard>
    //       </CCol>
    //       <CCol>
    //         <CCard className="text-white bg-primary" style={{ background: '#2c3e50 !important' }}>
    //           <CCardBody className="text-center">
    //             <div>
    //               <h2>DocuAi</h2>
    //               <p>
    //                 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
    //                 incididunt ut labore et dolore magna aliqua.
    //               </p>
    //               <Link to="/register">
    //                 <CButton color="primary" className="mt-3" active tabIndex={-1}>
    //                   Register Now!
    //                 </CButton>
    //               </Link>
    //             </div>
    //           </CCardBody>
    //         </CCard>
    //       </CCol>
    //     </CRow>
    //   </CContainer>
    // </div>
  )
}

export default Login
