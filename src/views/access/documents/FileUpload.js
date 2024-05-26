import { CButton, CForm, CFormInput, CCol, CTooltip, CSpinner, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { uploadFile } from '../../../services/FileService'
import { jwtDecode } from 'jwt-decode'
import CIcon from '@coreui/icons-react'

import { cilCloudUpload } from '@coreui/icons'
import { createAlert } from '../../../services/notificationService'
const token = localStorage.getItem('token')
const decodedToken = jwtDecode(token)

function FileUpload({ refreshFiles }) {
  const [file, setFile] = useState()
  const [uploadState, setUploadState] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  const ref = React.useRef()

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setShowSpinner(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileName', file.name)
    formData.append('userId', decodedToken.userId)
    formData.append('userName', decodedToken.userName)
    formData.append('locationId', decodedToken.locationId)
    formData.append('organizationId', decodedToken.organizationId)

    let res = await uploadFile(formData)
      .then(async (response) => {
        if (response.status == 200) {
          // Creating an alert on file upload
          let response = await createAlert({
            description: 'New file uploaded.',
            type: 'Information',
            userId: decodedToken?.userId,
            userName: decodedToken?.userName,
            organizationId: decodedToken.organizationId,
          })

          setUploadState(true)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
    ref.current.value = ''
    setFile(null)
    setShowSpinner(false)
    refreshFiles()
  }

  return (
    <CForm onSubmit={handleSubmit} className="align-items-baseline">
      <CRow>
        <CCol sm={10}>
          <CFormInput
            ref={ref}
            type="file"
            onChange={handleChange}
            style={{
              fontSize: 14,
              fontStyle: 'italic',
              color: 'orangered',
              fontWeight: 500,
              padding: 8,
            }}
          />
        </CCol>
        <CCol sm={2} className="text-center">
          <CTooltip content="Choose a file first then click on upload.">
            <CButton color="primary" type="submit" disabled={!file}>
              {showSpinner ? (
                <CSpinner size="sm" color="dark" variant="grow" />
              ) : (
                <CIcon icon={cilCloudUpload} />
              )}
            </CButton>
          </CTooltip>
        </CCol>
      </CRow>
      <div style={{ fontSize: 12 }}>
        {uploadState
          ? "AI Text extraction has started. You will be notified after it's completed."
          : ''}
      </div>
    </CForm>
  )
}

export default FileUpload
