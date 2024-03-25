import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
  CFormSelect,
  CInputGroupText,
  CInputGroup,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Spinners from '../../base/spinners/Spinners'
import Paginations from '../../base/paginations/Paginations'
import formatPhoneNumber, { decryptData } from '../../../services/Utility'
import { getLocationUsers } from '../../../services/LocationService'
import RegisterLocationUser from '../register-user/RegisterLocationUser'
import { getOrganizations } from '../../../services/OrganizationService'
import { getLocations } from '../../../services/LocationService'
import CIcon from '@coreui/icons-react'
import { cibQq, cilPencil } from '@coreui/icons'

function LocationUsers() {
  const [modal, setModal] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationUserList, setLocationUserList] = useState([])
  const [locationUserCurrentPage, setLocationUserCurrentPage] = useState(1)
  const [locationCount, setLocationCount] = useState()
  const secretKey = 'alibaba1234@Devops&$%'
  const [selectedOrgId, setSelectedOrgId] = useState()
  const [selectedLocId, SetSelectedLocId] = useState()
  const [orgList, setOrgList] = useState([])
  const [locationsList, SetLocationList] = useState([])
  const [editData, setEditData] = useState({})

  useEffect(() => {
    fetchOrganizations()
    fetchLocations()
    fetchLocationUsers()
  }, [selectedOrgId, selectedLocId])

  const fetchOrganizations = async () => {
    await getOrganizations({ currentPage: '' })
      .then((response) => {
        setOrgList(response?.data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  const fetchLocations = async () => {
    await getLocations({ organizationId: selectedOrgId })
      .then((response) => {
        SetLocationList(response?.data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  const fetchLocationUsers = async () => {
    setLocationLoading(true)
    await getLocationUsers({
      locationId: selectedLocId,
      organizationId: selectedOrgId,
      currentPage: locationUserCurrentPage,
    })
      .then((response) => {
        setLocationUserList(response?.data)
        setLocationCount(response?.totalPages === 0 ? 1 : response?.totalPages)
        setLocationLoading(false)
      })
      .catch((error) => {
        console.log('error', error)
        setLocationLoading(false)
      })
  }

  return (
    <div>
      {!modal && (
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              {locationLoading ? (
                <div className="d-flex justify-content-center">
                  <Spinners />
                </div>
              ) : (
                <>
                  <CCardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ marginRight: '20px' }}>
                        <strong className="fontHeader">Users</strong>
                      </div>

                      <CTooltip content="Add New Property Admin" placement="bottom">
                        <CButton
                          color="primary"
                          style={{ float: 'right', marginRight: 0 }}
                          onClick={() => {
                            setModal(true)
                            setEditData({})
                          }}
                        >
                          ADD
                        </CButton>
                      </CTooltip>
                    </div>
                  </CCardHeader>

                  <CCardBody>
                    <div style={{ marginTop: 5 }}>
                      <CTooltip content="Select...an Organization">
                        <CInputGroup style={{ marginBottom: 5 }}>
                          <CInputGroupText id="basic-addon1">Organization(s)</CInputGroupText>
                          <CFormSelect
                            id="organizationList"
                            type="text"
                            name="organizationList"
                            placeholder="All Organizations"
                            value={selectedOrgId}
                            onChange={(e) => setSelectedOrgId(e.target.value)}
                          >
                            <option value="1">Select...one</option>
                            {orgList?.map((item) => (
                              <option key={item.organizationId} value={item?.organizationId}>
                                {item?.organizationName}
                              </option>
                            ))}
                          </CFormSelect>
                        </CInputGroup>
                      </CTooltip>
                      <CTooltip content="Select...a Location.">
                        <CInputGroup style={{ marginBottom: 5 }}>
                          <CInputGroupText id="basic-addon1" style={{ paddingLeft: 42 }}>
                            Property(s)
                          </CInputGroupText>
                          <CFormSelect
                            id="locationList"
                            type="text"
                            name="locationList"
                            placeholder="All"
                            value={selectedLocId}
                            onChange={(e) => SetSelectedLocId(e.target.value)}
                          >
                            <option value="1">Select...one</option>
                            {locationsList?.map((item) => (
                              <option key={item.locationId} value={item?.locationId}>
                                {item?.locationName}
                              </option>
                            ))}
                          </CFormSelect>
                        </CInputGroup>
                      </CTooltip>
                    </div>
                    <CTable>
                      <CTableHead>
                        <CTableRow style={{ backgroundColor: '#f3f4f7' }}>
                          <CTableHeaderCell scope="col">Picture</CTableHeaderCell>
                          <CTableHeaderCell scope="col">User Name</CTableHeaderCell>
                          <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Property</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Organization</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {locationUserList?.length > 0 ? (
                          locationUserList?.map((item, key) => {
                            return (
                              <CTableRow key={key}>
                                <CTableHeaderCell scope="row">
                                  {
                                    // <img
                                    //   src={UserNoImage}
                                    //   alt="User Image"
                                    //   style={{ width: 30, height: 30, borderRadius: 50 }}
                                    // />
                                    <CIcon
                                      icon={cibQq}
                                      customClassName="nav-icon"
                                      style={{
                                        height: '40',
                                        width: '40',
                                        color: '#212631',
                                        background: '#959fb2',
                                        borderRadius: 50,
                                        padding: 6,
                                      }}
                                    />
                                  }
                                </CTableHeaderCell>
                                <CTableDataCell>{item?.userName}</CTableDataCell>
                                <CTableDataCell>{item?.firstName}</CTableDataCell>
                                <CTableDataCell>{item?.lastName}</CTableDataCell>
                                <CTableDataCell>{item?.emailAddress}</CTableDataCell>
                                <CTableDataCell>
                                  {formatPhoneNumber(item?.phoneNumber)}
                                </CTableDataCell>
                                <CTableDataCell>
                                  {item?.vw_loc_users[0]?.locationName}
                                </CTableDataCell>
                                <CTableDataCell>
                                  {item?.vw_org_users[0]?.organizationName}
                                </CTableDataCell>
                                <CTableDataCell>
                                  <CTooltip content="Edit" placement="bottom">
                                    <CIcon
                                      icon={cilPencil}
                                      size="lg"
                                      color="primary"
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => {
                                        setModal(true)
                                        setEditData(item)
                                      }}
                                    />
                                  </CTooltip>
                                </CTableDataCell>
                              </CTableRow>
                            )
                          })
                        ) : (
                          <CTableRow>
                            <CTableDataCell colSpan={9}>No Data Found </CTableDataCell>
                          </CTableRow>
                        )}
                      </CTableBody>
                    </CTable>
                  </CCardBody>
                  <Paginations
                    currentPage={locationUserCurrentPage}
                    setCurrentPage={setLocationUserCurrentPage}
                    count={locationCount}
                  />
                </>
              )}
            </CCard>
          </CCol>
        </CRow>
      )}
      {modal && (
        <RegisterLocationUser
          setModal={setModal}
          fetchLocationUsers={fetchLocationUsers}
          secretKey={secretKey}
          editData={editData}
        />
      )}
    </div>
  )
}

export default LocationUsers
