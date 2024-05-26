import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalTitle,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CFormInput,
  CFormLabel,
  CButton,
  CRow,
  CCol,
  CCardBody,
  CPopover,
  CFormTextarea,
  CForm,
} from '@coreui/react'
import toast from 'react-hot-toast'
import { cilAlarm } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

function ShareModal({ title, visibleState, setVisibleState, blobStoragePath, func }) {
  const [validated, setValidated] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [formData, setFormData] = useState({
    emailAddress: '',
    emailSubject: '',
    emailBody: '',
    blobPath: blobStoragePath,
  })

  const clearForm = () => {
    setFormData({ emailAddress: '', blobPath: '', emailSubject: '', emailBody: '' })
    setVisibleState(false)
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false && isValidEmail === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    formData.blobPath = blobStoragePath

    await func(formData)
      .then((response) => {
        toast.success(response?.data?.message)
        setVisibleState(false)
      })
      .catch((error) => {
        console.log('err', error)
        toast.error('Sending a file in an email has failed.')
      })
  }

  const onInputValueChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === 'emailAddress') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      setIsValidEmail(emailRegex.test(e.target.value))
    }
  }
  return (
    <>
      <CModal
        backdrop={'static'}
        visible={visibleState}
        onClose={() => {
          clearForm()
        }}
        aria-labelledby="shareModal"
      >
        <CForm
          className="needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CModalHeader onClose={() => clearForm()}>
            <CModalTitle id="fileShareModal">{title}</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CPopover
              title="Verify Information"
              content="Verify your email before you share. Page might contain sensitive information!"
              placement="right"
            >
              <>
                <CButton color="danger" style={{ marginRight: 5 }}>
                  <CIcon icon={cilAlarm} title="Verify Information" />
                </CButton>
                Verify Email Address and Information!
                <p>{blobStoragePath?.split('/')[1]}</p>
              </>
            </CPopover>

            <CCardBody>
              <div className="mb-3">
                <CRow>
                  <CCol>
                    <CFormLabel htmlFor="emailAddress">Email*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="emailAddress"
                      id="emailAddress"
                      feedbackInvalid="Enter valid Email Address"
                      type="email"
                      name="emailAddress"
                      placeholder="Enter Your Email"
                      value={formData?.emailAddress}
                      onChange={(e) => onInputValueChange(e)}
                      invalid={!isValidEmail}
                      autoComplete="new-email"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormLabel htmlFor="emailSubject">Subject*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="emailSubject"
                      id="emailSubject"
                      feedbackInvalid="Enter Email Subject"
                      type="text"
                      name="emailSubject"
                      placeholder="Enter Email Subject"
                      value={formData?.emailSubject}
                      onChange={(e) => onInputValueChange(e)}
                      autoComplete="new-subject"
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormLabel htmlFor="emailBody">Body*</CFormLabel>
                    <CFormTextarea
                      required
                      aria-describedby="emailBody"
                      id="emailBody"
                      feedbackInvalid="Enter Email Body"
                      type="text"
                      name="emailBody"
                      placeholder="Enter Email Body"
                      value={formData.emailBody}
                      onChange={(e) => onInputValueChange(e)}
                    />
                  </CCol>
                </CRow>
              </div>
            </CCardBody>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => clearForm()}>
              Close
            </CButton>
            <CButton color="primary" onClick={handleSubmit}>
              Share
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default ShareModal
