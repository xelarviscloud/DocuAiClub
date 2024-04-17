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
} from '@coreui/react'

function SearchPagePanel({ fetchSearchPages }) {
  const [searchParams, setSearchParams] = useState({})

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setSearchParams({ ...searchParams, [name]: value })
  }

  function onSearchClicked() {
    let criteria = {
      arrivalDate: searchParams.arrivalDate,
      departureDate: searchParams.departureDate,
      name: searchParams.name?.toLowerCase(),
      confirmationNumber: searchParams.confirmationNumber?.toLowerCase(),
    }
    fetchSearchPages(criteria)
  }

  return (
    <header className="header d-block">
      <CForm className="row g-3">
        <CCol md={3}>
          <CFormInput
            label="Name"
            name="name"
            id="name"
            placeholder="Name"
            aria-label="Name"
            className="m-1"
            value={searchParams.name}
            onChange={(e) => handleOnChange(e)}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            label="Confirmation#"
            name="confirmationNumber"
            id="confirmationNumber"
            placeholder="Confirmation#"
            aria-label="Confirmation#"
            className="m-1"
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
            className="m-1"
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
            className="m-1"
            value={searchParams.departureDate}
            onChange={(e) => handleOnChange(e)}
          />
        </CCol>
        <CCol md={2} className="text-center">
          <CButton
            style={{ marginTop: 35 }}
            label="search"
            class="btn btn-outline-success align-self-center"
            type="button"
            onClick={onSearchClicked}
          >
            Search
          </CButton>
        </CCol>
      </CForm>
      {/* <div className="d-block">
        <CAccordion>
          <CAccordionItem>
            <CAccordionHeader>
              <CRow>More Filters</CRow>
            </CAccordionHeader>
            <CAccordionBody>
              <CRow>
                <CCol xs>
                  <CFormInput placeholder="Name" aria-label="Name" />
                </CCol>
                <CCol xs>
                  <CFormInput placeholder="Confirmation#" aria-label="Confirmation#" />
                </CCol>
                <CCol xs>
                  <CFormInput placeholder="Arrival" aria-label="Arrival" />
                </CCol>
                <CCol xs>
                  <CFormInput placeholder="Departure" aria-label="Departure" />
                </CCol>
              </CRow>
            </CAccordionBody>
          </CAccordionItem>
        </CAccordion>
      </div> */}
    </header>
  )
}

export default SearchPagePanel
