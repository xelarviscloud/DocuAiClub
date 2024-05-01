import React, { useEffect, useState } from 'react'
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CTooltip,
  CSpinner,
  CRow,
  CCol,
  CFormInput,
  CForm,
  CButton,
  CFormLabel,
  CBadge,
  CFormSelect,
  CFormCheck,
} from '@coreui/react'
import moment from 'moment'
import { jwtDecode } from 'jwt-decode'

function SearchDocumentPanel({ fetchSearchDocuments, pageCounts }) {
  const _createdDate = moment().subtract(7, 'd').format('YYYY-MM-DD')
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  let _locationId = decodedToken.locationId

  const [searchParams, setSearchParams] = useState({
    fileName: '',
    status: '',
    includeDeletedDocuments: false,
    createdDate: _createdDate,
  })

  function onSearchClicked() {
    let criteria = {
      fileName: searchParams.fileName,
      arrivalDate: searchParams.arrivalDate,
      departureDate: searchParams.departureDate,
      status: searchParams.status,
      includeDeletedDocuments: searchParams.includeDeletedDocuments,
      createdDate: searchParams.createdDate,
      locationId: _locationId,
    }
    fetchSearchDocuments(criteria)
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setSearchParams({ ...searchParams, [name]: value })
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    console.log('aaaa', name, checked)
    setSearchParams({
      ...searchParams,
      [name]: checked,
    })
  }

  function onClearClicked() {
    setSearchParams({
      status: '',
      fileName: '',
      includeDeletedDocuments: false,
      arrivalDate: '',
      departureDate: '',
      createdDate: _createdDate,
    })
  }
  return (
    <header className="header d-block">
      <div className="d-flex justify-content-between">
        <span style={{ fontSize: 10 }}>
          {searchParams.fileName} {searchParams.status} {searchParams.includeDeletedDocuments}
          {searchParams.arrivalDate}
          {searchParams.departureDate}
          {searchParams.createdDate}{' '}
          {pageCounts > 0 ? (
            <CBadge className="me-1" color="info">
              {pageCounts}
            </CBadge>
          ) : (
            ''
          )}
        </span>
        <span className="d-flex">
          Created:{' '}
          <CFormInput
            style={{
              padding: 3,
              margin: 0,
              marginLeft: 4,
              fontSize: 14,
              lineHeight: 'normal',
            }}
            name="createdDate"
            id="createdDate"
            type="date"
            placeholder="Created Date"
            aria-label="Created Date"
            value={searchParams.createdDate}
            onChange={(e) => handleOnChange(e)}
          />
        </span>
      </div>
      <div>
        <CForm className="row g-3">
          <CCol md={2}>
            <CFormInput
              label="File Name"
              name="fileName"
              id="fileName"
              placeholder="File Name"
              aria-label="File Name"
              value={searchParams.fileName}
              onChange={(e) => handleOnChange(e)}
            />
          </CCol>
          <CCol md={2}>
            <CFormSelect
              aria-label="Select Status"
              label="Status"
              name="status"
              id="status"
              value={searchParams.status}
              onChange={(e) => handleOnChange(e)}
              placeholder="Status"
            >
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="Error">Error</option>
            </CFormSelect>
          </CCol>
          <CCol md={4} className="align-items-center text-center">
            <CFormLabel className="d-block">Include Deleted Documents</CFormLabel>
            <CFormCheck
              style={{ marginTop: 12 }}
              name="includeDeletedDocuments"
              id="includeDeletedDocuments"
              checked={searchParams.includeDeletedDocuments}
              onChange={(e) => handleCheckboxChange(e)}
            />
          </CCol>
          {/* <CCol md={2}>
            <CFormInput
              label="Arrival Date"
              name="arrivalDate"
              id="arrivalDate"
              type="date"
              placeholder="Arrival Date"
              aria-label="Arrival Date"
              value={searchParams.arrivalDate}
              onChange={(e) => handleOnChange(e)}
            />
          </CCol>
          <CCol md={2}>
            <CFormInput
              label="Departure Date"
              name="departureDate"
              id="departureDate"
              type="date"
              placeholder="Departure Date"
              aria-label="Departure Date"
              value={searchParams.departureDate}
              onChange={(e) => handleOnChange(e)}
            />
          </CCol> */}
          <CCol md={2} className="text-center">
            <CButton
              style={{ marginTop: 32 }}
              className="btn btn-outline-success align-self-center"
              type="button"
              onClick={onSearchClicked}
            >
              Search
            </CButton>
            <CButton
              style={{ marginTop: 32, marginLeft: 5 }}
              className="btn btn-outline-warning align-self-center"
              type="button"
              onClick={onClearClicked}
            >
              Clear
            </CButton>
          </CCol>

          <CAccordion id="more-filters">
            <CAccordionItem>
              <CAccordionHeader>
                <CRow>More Filters</CRow>
              </CAccordionHeader>
              <CAccordionBody style={{ padding: 8 }}>
                <CRow>
                  <div className="input-group mb-3">
                    {/* <span className="input-group-text" id="basic-createdDate">
                      Created Date
                    </span> */}
                    {/* <CFormInput
                      name="createdDate"
                      id="createdDate"
                      type="date"
                      placeholder="Created Date"
                      aria-label="Created Date"
                      value={searchParams.createdDate}
                      onChange={(e) => handleOnChange(e)}
                    /> */}
                  </div>
                </CRow>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CForm>
      </div>
    </header>
  )
}

export default SearchDocumentPanel
