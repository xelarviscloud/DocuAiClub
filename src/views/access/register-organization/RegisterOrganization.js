import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTooltip,
} from '@coreui/react'
import Spinners from '../../base/spinners/Spinners'
import { addOrganization, editOrganization } from '../../../services/OrganizationService'
import toast from 'react-hot-toast'

const RegisterOrganization = ({
  setModal,
  fetchOrganizations,
  editData,
  header = '',
  hideCancel = false,
}) => {
  const [values, setValues] = useState(editData)
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allowEdit, setAllowEdit] = useState(hideCancel)

  console.log('values', values, editData)
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity() === false) {
      const formOrganization = {
        organizationName: values?.organizationName,
        phoneNumber: values?.phoneNumber,
        emailAddress: values?.emailAddress,
        addressLine1: values?.addressLine1,
        addressLine2: values?.addressLine2,
        state: values?.state,
        city: values?.city,
        zipCode: values?.zipCode,
        notes: values?.notes,
      }
      setLoading(true)
      await (
        editData?.organizationId
          ? editOrganization({ id: editData?.organizationId, body: formOrganization })
          : addOrganization({ body: formOrganization })
      )
        .then((response) => {
          toast.success(response?.message)
          // setValues({
          //   organizationName: '',
          //   phoneNumber: '',
          //   emailAddress: '',
          //   addressLine1: '',
          //   addressLine2: '',
          //   city: '',
          //   state: '',
          //   zipCode: '',
          //   notes: '',
          // })
          if (fetchOrganizations) {
            fetchOrganizations()
          }
          setModal(false)
          setLoading(false)
        })
        .catch((error) => {
          console.log('err', error)
          toast.error(error?.response?.data?.error)
          setLoading(false)
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
            <strong>{header?.length > 0 ? header : 'Add New Organization'}</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleOnSubmit}
            >
              <fieldset disabled={allowEdit}>
                <div className="mb-3">
                  <CRow>
                    <CCol xs>
                      <CFormLabel htmlFor="organizationName">Name*</CFormLabel>
                      <CFormInput
                        required
                        aria-describedby="validationNameFeedback"
                        id="organizationName"
                        feedbackInvalid="Please provide Organization Name"
                        type="text"
                        name="organizationName"
                        placeholder="Enter Your Name"
                        value={values?.organizationName}
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
                        aria-describedby="validationEmailFeedback"
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
                          aria-describedby="validationPhoneFeedback"
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
                        aria-describedby="validationAddressFeedback"
                        id="addressLine1"
                        feedbackInvalid="Please provide an Address"
                        type="text"
                        name="addressLine1"
                        placeholder="Enter Your Address 1"
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
                        placeholder="Enter Your Address 2"
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
                        aria-describedby="validationCityFeedback"
                        id="city"
                        feedbackInvalid="Please provide city"
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
                        aria-describedby="validationStateFeedback"
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
                        aria-describedby="validationZipFeedback"
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
              </fieldset>
              <div className="mb-3">
                <CTooltip content="Submit Organization" placement="bottom">
                  <CButton
                    disabled={allowEdit}
                    color="primary"
                    type="submit"
                    style={{ float: 'right', marginRight: 10, display: 'flex' }}
                  >
                    Submit
                    {loading && (
                      <div className="clearfix">
                        <Spinners className="float-end" />
                      </div>
                    )}
                  </CButton>
                </CTooltip>
                {allowEdit ? (
                  <CTooltip content="Close Organization Form" placement="bottom">
                    <CButton
                      color="secondary"
                      style={{ float: 'right', marginRight: 10, display: 'flex' }}
                      onClick={(e) => setAllowEdit(false)}
                    >
                      Edit
                    </CButton>
                  </CTooltip>
                ) : (
                  <CTooltip content="Close Organization Form" placement="bottom">
                    <CButton
                      color="secondary"
                      style={{ float: 'right', marginRight: 10, display: 'flex' }}
                      onClick={(e) => {
                        setModal(false)
                        setAllowEdit(true)
                      }}
                    >
                      Cancel
                    </CButton>
                  </CTooltip>
                )}
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RegisterOrganization
