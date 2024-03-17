import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const RegisterOrganization = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add New Organization</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                <CFormInput type="email" id="exampleFormControlInput1" placeholder="" />
              </div>

              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Address Line1</CFormLabel>
                    <CFormInput type="email" id="exampleFormControlInput1" placeholder="" />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Address Line2</CFormLabel>
                    <CFormInput type="email" id="exampleFormControlInput1" placeholder="" />
                  </CCol>
                </CRow>
              </div>
              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">City</CFormLabel>
                    <CFormInput type="email" id="exampleFormControlInput1" placeholder="" />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">State</CFormLabel>
                    <CFormInput type="email" id="exampleFormControlInput1" placeholder="" />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Zip</CFormLabel>
                    <CFormInput type="email" id="exampleFormControlInput1" placeholder="" />
                  </CCol>
                </CRow>
              </div>
              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Contact</CFormLabel>
                    <CFormInput type="text" id="exampleFormControlInput1" placeholder="" />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
                    <CFormInput type="email" id="exampleFormControlInput1" placeholder="" />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Phone</CFormLabel>
                    <CFormInput type="phone" id="exampleFormControlInput1" placeholder="" />
                  </CCol>
                </CRow>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RegisterOrganization
