import React, { useState } from 'react'
import { CButton, CCol, CForm, CFormInput, CRow, CFormLabel, CCardImage } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../../services/LoginService'
import setCookie from '../../../resources/utility'
import Logo from '../../../assets/logo-bg-1.png'
import Background from '../../../assets/Register.png'
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast'
import Spinners from '../../base/spinners/Spinners'

const Login = () => {
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
      let result = await userLogin(credentials).then((response) => {
        setCookie('token', response?.accessToken, 24)
        localStorage.setItem('token', response?.accessToken)
      })
      // assume user is logged in successful.
      navigate('/dashboard')
    } else {
      setValidated(true)
    }
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
          <CForm
            // className="g-3 needs-validation"
            style={{ border: '1px solid', borderRadius: 5, padding: 25 }}
            noValidate
            validated={validated}
            onSubmit={handleLogin}
          >
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
  )
}

export default Login
