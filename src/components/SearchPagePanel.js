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
} from '@coreui/react'
import moment from 'moment'
import { jwtDecode } from 'jwt-decode'

function SearchPagePanel({ fetchSearchPages, pageCounts }) {
  const _createdDate = moment().subtract(7, 'd').format('YYYY-MM-DD')
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  let _locationId = decodedToken.locationId

  const [searchParams, setSearchParams] = useState({ createdDate: _createdDate })
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setSearchParams({ ...searchParams, [name]: value })
  }

  function onSearchClicked() {
    let criteria = {
      content: searchParams.content,
      arrivalDate: searchParams.arrivalDate,
      departureDate: searchParams.departureDate,
      name: searchParams.name?.toLowerCase(),
      confirmationNumber: searchParams.confirmationNumber?.toLowerCase(),
      createdDate: searchParams.createdDate,
      locationId: _locationId,
    }
    fetchSearchPages(criteria)
  }

  function onClearClicked() {
    setSearchParams({
      name: '',
      content: '',
      confirmationNumber: '',
      arrivalDate: '',
      departureDate: '',
      createdDate: _createdDate,
    })
  }
  return (
    <header className="header d-block">
      <div className="d-flex justify-content-between">
        <span style={{ fontSize: 10 }}>
          {searchParams.content} {searchParams.name} {searchParams.confirmationNumber}
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
          <span style={{ minWidth: 110 }}>Uploaded Date: </span>
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
              label="Content"
              name="content"
              id="content"
              placeholder="Content"
              aria-label="Content"
              value={searchParams.content}
              onChange={(e) => handleOnChange(e)}
            />
          </CCol>
          <CCol md={2}>
            <CFormInput
              label="Name"
              name="name"
              id="name"
              placeholder="Name"
              aria-label="Name"
              value={searchParams.name}
              onChange={(e) => handleOnChange(e)}
            />
          </CCol>
          <CCol md={2}>
            <CFormInput
              label="Confirmation#"
              name="confirmationNumber"
              id="confirmationNumber"
              placeholder="Confirmation#"
              aria-label="Confirmation#"
              value={searchParams.confirmationNumber}
              onChange={(e) => handleOnChange(e)}
            />
          </CCol>
          <CCol md={2}>
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
          </CCol>
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

export default SearchPagePanel
