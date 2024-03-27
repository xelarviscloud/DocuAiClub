import { CCol, CRow, CSpinner } from '@coreui/react'
import React from 'react'

const Spinners = ({ className }) => {
  return (
    <CRow>
      <CCol xs={12}>
        <CSpinner className={className} />
      </CCol>
    </CRow>
  )
}

export default Spinners
