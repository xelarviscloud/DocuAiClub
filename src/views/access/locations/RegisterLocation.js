import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTooltip,
} from '@coreui/react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { addLocation, updateLocation } from '../../../services/LocationService'

function RegisterLocation({
  setModal,
  fetchLocations,
  orgList,
  editData,
  header = '',
  isFormViewOnly = false,
}) {
  const [values, setValues] = useState(editData)
  const [validated, setValidated] = useState(false)
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity() === false) {
      const formLocation = {
        ...values,
      }
      await (
        editData?.locationId
          ? updateLocation({ id: editData?.locationId, body: formLocation })
          : addLocation({ body: formLocation })
      )
        .then((response) => {
          console.log('response', response)
          toast.success(response?.message)
          setValues({
            locationName: '',
            phoneNumber: '',
            emailAddress: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipCode: '',
            notes: '',
            organizationId: '',
          })
          fetchLocations()
          setModal(false)
        })
        .catch((error) => {
          console.log('err', error)
          toast.error(error?.response?.data?.error)
        })
    } else {
      setValidated(true)
      e.stopPropagation()
    }
  }

  const handleNumberKeyDown = (e) => {
    // Allow only numbers (0-9) and backspace/delete key
    const isValidKey = /[0-9]|Backspace|Delete/.test(e.key)

    if (!isValidKey) {
      e.preventDefault()
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>{header}</strong>
            <span>{values?.organizationName ? values?.organizationName : 'Add New Property'}</span>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleOnSubmit}
            >
              <fieldset disabled={isFormViewOnly}>
                <div className="mb-3">
                  <CRow>
                    <CCol xs>
                      <CCol xs>
                        {values?.organizationName ? (
                          ''
                        ) : (
                          <>
                            <CFormLabel htmlFor="organizationId">Organization*</CFormLabel>
                            <CFormSelect
                              required
                              aria-describedby="organizationId"
                              id="organizationId"
                              feedbackInvalid="Please select an Organization"
                              type="select"
                              name="organizationId"
                              placeholder="Enter Organization"
                              value={values?.locationOrgId}
                              onChange={(e) => handleOnChange(e)}
                              disabled={editData?.locationOrgId}
                            >
                              <option value="">Select an Organization</option>
                              {orgList?.map((item) => (
                                <option key={item.organizationId} value={item?.organizationId}>
                                  {item?.organizationName}
                                </option>
                              ))}
                            </CFormSelect>
                          </>
                        )}
                      </CCol>
                    </CCol>
                  </CRow>
                </div>
                <div className="mb-3">
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="locationName">Name*</CFormLabel>
                      <CFormInput
                        required
                        aria-describedby="locationName"
                        id="locationName"
                        feedbackInvalid="Please provide Property Name"
                        type="text"
                        name="locationName"
                        placeholder="Enter Property Name"
                        value={values?.locationName}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </CCol>
                  </CRow>
                </div>

                <div className="mb-3">
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="emailAddress">Email*</CFormLabel>
                      <CFormInput
                        required
                        aria-describedby="emailAddress"
                        id="emailAddress"
                        feedbackInvalid="Please provide an Email"
                        type="email"
                        name="emailAddress"
                        pattern="^\S+@\S+\.\S+$"
                        placeholder="Enter Your Email"
                        value={values?.emailAddress}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="phoneNumber">Phone*</CFormLabel>
                      <CInputGroup>
                        <CInputGroupText id="basic-addon1">+1</CInputGroupText>
                        <CFormInput
                          required
                          aria-describedby="phoneNumber"
                          id="phoneNumber"
                          feedbackInvalid="Please provide a Phone Number"
                          type="text"
                          name="phoneNumber"
                          placeholder="Enter Your Phone Number"
                          maxLength={10}
                          pattern="\d{10}"
                          value={values?.phoneNumber}
                          onChange={(e) => handleOnChange(e)}
                          onKeyDown={handleNumberKeyDown}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                </div>

                <div className="mb-3">
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="addressLine1">Address Line1*</CFormLabel>
                      <CFormInput
                        required
                        aria-describedby="addressLine1"
                        id="addressLine1"
                        feedbackInvalid="Please provide an Address"
                        type="text"
                        name="addressLine1"
                        placeholder="Enter Address Line 1"
                        value={values?.addressLine1}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="addressLine2">Address Line2</CFormLabel>
                      <CFormInput
                        id="addressLine2"
                        type="text"
                        name="addressLine2"
                        placeholder="Enter Address Line 2"
                        value={values?.addressLine2}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </CCol>
                  </CRow>
                </div>

                <div className="mb-3">
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="city">City*</CFormLabel>
                      <CFormInput
                        required
                        aria-describedby="city"
                        id="city"
                        feedbackInvalid="Please provide City"
                        type="text"
                        name="city"
                        placeholder="Enter Your City"
                        value={values?.city}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="state">State*</CFormLabel>
                      <CFormInput
                        required
                        aria-describedby="state"
                        id="state"
                        feedbackInvalid="Please provide State"
                        type="text"
                        name="state"
                        placeholder="Enter Your State"
                        value={values?.state}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </CCol>
                    <CCol xs>
                      <CFormLabel htmlFor="zipCode">Zip*</CFormLabel>
                      <CFormInput
                        required
                        aria-describedby="zipCode"
                        id="zipCode"
                        feedbackInvalid="Please provide Zip"
                        type="text"
                        name="zipCode"
                        placeholder="Enter Your Zip"
                        maxLength={5}
                        pattern="\d{5}"
                        value={values?.zipCode}
                        onChange={(e) => handleOnChange(e)}
                        onKeyDown={handleNumberKeyDown}
                      />
                    </CCol>
                  </CRow>
                </div>

                <div className="mb-3">
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="notes">Note</CFormLabel>
                      <CFormInput
                        id="notes"
                        type="text"
                        name="notes"
                        placeholder="Enter Notes"
                        value={values?.notes}
                        onChange={(e) => handleOnChange(e)}
                      />
                    </CCol>
                  </CRow>
                </div>
                {isFormViewOnly ? (
                  ''
                ) : (
                  <div className="mb-3">
                    <CTooltip content="Submit Property" placement="bottom">
                      <CButton
                        color="primary"
                        type="submit"
                        style={{ float: 'right', marginRight: 10, display: 'flex' }}
                      >
                        Submit
                      </CButton>
                    </CTooltip>
                    <CTooltip content="Close Property Form" placement="bottom">
                      <CButton
                        color="secondary"
                        style={{ float: 'right', marginRight: 10, display: 'flex' }}
                        onClick={() => setModal(false)}
                      >
                        Cancel
                      </CButton>
                    </CTooltip>
                  </div>
                )}
              </fieldset>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RegisterLocation
