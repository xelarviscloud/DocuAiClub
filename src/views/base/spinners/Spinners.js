import React from 'react'
import { CCol, CSpinner, CRow } from '@coreui/react'

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
