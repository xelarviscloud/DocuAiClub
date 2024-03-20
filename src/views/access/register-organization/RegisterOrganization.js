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
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTooltip,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import Spinners from '../../base/spinners/Spinners'
import { addOrganization, editOrganization } from '../../../services/OrganizationService'
import toast from 'react-hot-toast'

const RegisterOrganization = ({ setModal, fetchOrganizations, editData }) => {
  const [values, setValues] = useState(editData)
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  console.log('editData', editData, values)
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity() === false) {
      const credentials = {
        name: values?.name,
        phone_number: editData?.organizationid ? values?.phone_number : '+1' + values?.phone_number,
        email: values?.email,
        address_line1: values?.address_line1,
        address_line2: values?.address_line2,
        state: values?.state,
        city: values?.city,
        zip_code: values?.zip_code,
        notes: values?.notes,
      }
      setLoading(true)
      await (
        editData?.organizationid
          ? editOrganization({ id: editData?.organizationid, body: credentials })
          : addOrganization({ body: credentials })
      )
        .then((res) => {
          console.log('res', res)
          toast.success(res?.message)
          setValues({
            name: '',
            phone_number: '',
            email: '',
            address_line1: '',
            address_line2: '',
            city: '',
            state: '',
            zip_code: '',
            notes: '',
          })
          fetchOrganizations()
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

    // If the key pressed is not valid, prevent the default action
    if (!isValidKey) {
      e.preventDefault()
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add New Organization</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleOnSubmit}
            >
              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Name*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="validationNameFeedback"
                      id="validationName"
                      feedbackInvalid="Please provide a name"
                      type="text"
                      name="name"
                      placeholder="Enter Your Name"
                      value={values?.name}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </CCol>
                </CRow>
              </div>

              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Email*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="validationEmailFeedback"
                      id="validationEmail"
                      feedbackInvalid="Please provide a email"
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      value={values?.email}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Phone*</CFormLabel>
                    <CInputGroup>
                      <CInputGroupText id="basic-addon1">+1</CInputGroupText>
                      <CFormInput
                        required
                        aria-describedby="validationPhoneFeedback"
                        id="validationPhone"
                        feedbackInvalid="Please provide a phone number"
                        type="text"
                        name="phone_number"
                        placeholder="Enter Your Phone Number"
                        maxLength={10}
                        value={values?.phone_number}
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
                    <CFormLabel htmlFor="exampleFormControlInput1">Address Line1*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="validationAddressFeedback"
                      id="validationAddress"
                      feedbackInvalid="Please provide a Address"
                      type="text"
                      name="address_line1"
                      placeholder="Enter Your Address 1"
                      value={values?.address_line1}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Address Line2</CFormLabel>
                    <CFormInput
                      id="addressline2"
                      type="text"
                      name="address_line2"
                      placeholder="Enter Your Address 2"
                      value={values?.address_line2}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </CCol>
                </CRow>
              </div>

              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">City*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="validationCityFeedback"
                      id="validationCity"
                      feedbackInvalid="Please provide a city"
                      type="text"
                      name="city"
                      placeholder="Enter Your City"
                      value={values?.city}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">State*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="validationStateFeedback"
                      id="validationState"
                      feedbackInvalid="Please provide a state"
                      type="text"
                      name="state"
                      placeholder="Enter Your State"
                      value={values?.state}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </CCol>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Zip*</CFormLabel>
                    <CFormInput
                      required
                      aria-describedby="validationZipFeedback"
                      id="validationZip"
                      feedbackInvalid="Please provide a zip code"
                      type="text"
                      name="zip_code"
                      placeholder="Enter Your Zipcode"
                      maxLength={5}
                      value={values?.zip_code}
                      onChange={(e) => handleOnChange(e)}
                      onKeyDown={handleNumberKeyDown}
                    />
                  </CCol>
                </CRow>
              </div>

              <div className="mb-3">
                <CRow>
                  <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1">Note</CFormLabel>
                    <CFormInput
                      id="validationNote"
                      type="text"
                      name="notes"
                      placeholder="Enter Notes"
                      value={values?.notes}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </CCol>
                </CRow>
              </div>

              <div className="mb-3">
                <CTooltip content="Submit Organization" placement="bottom">
                  <CButton
                    color="primary"
                    type="submit"
                    style={{ float: 'right', marginRight: 10, display: 'flex' }}
                    // onClick={(e) => handleOnSubmit(e)}
                  >
                    Submit
                    {loading && (
                      <div className="clearfix">
                        <Spinners className="float-end" />
                      </div>
                    )}
                  </CButton>
                </CTooltip>
                <CTooltip content="Close Organization Form" placement="bottom">
                  <CButton
                    color="secondary"
                    style={{ float: 'right', marginRight: 10, display: 'flex' }}
                    onClick={(e) => setModal(false)}
                  >
                    Cancel
                  </CButton>
                </CTooltip>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RegisterOrganization
