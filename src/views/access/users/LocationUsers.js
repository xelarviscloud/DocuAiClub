import { cibQq, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
  CCallout,
} from '@coreui/react'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import AppLabel from '../../../components/AppLabel'
import { getLocationUsers, getLocations } from '../../../services/LocationService'
import { getOrganizations } from '../../../services/OrganizationService'
import formatPhoneNumber from '../../../services/Utility'
import Paginations from '../../base/paginations/Paginations'
import RegisterLocationUser from '../locations/RegisterLocationUser'

function LocationUsers() {
  const [modal, setModal] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationUserList, setLocationUserList] = useState([])
  const [locationUserCurrentPage, setLocationUserCurrentPage] = useState(1)
  const [locationCount, setLocationCount] = useState()
  const [selectedOrgId, setSelectedOrgId] = useState()
  const [selectedLocId, setSelectedLocId] = useState()
  const [orgList, setOrgList] = useState([])
  const [locationsList, setLocationList] = useState([])
  const [editData, setEditData] = useState({})
  const [currentOrganization, setCurrentOrganization] = useState({})
  const [isEditUser, setIsEditUser] = useState(false)

  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  let _userOrgId = decodedToken.organizationId

  useEffect(() => {
    fetchOrganizations()
    if (decodedToken?.role != 'superadmin') {
      setSelectedOrgId(_userOrgId)
    }
  }, [])

  useEffect(() => {
    if (selectedOrgId) {
      fetchLocations()
    }
  }, [selectedOrgId])

  useEffect(() => {
    if (selectedLocId) {
      fetchLocationUsers()
    }
  }, [selectedLocId])

  const fetchOrganizations = async () => {
    await getOrganizations({ currentPage: '' })
      .then((response) => {
        setOrgList(response?.data)
        setCurrentOrganization(response?.data?.find((e) => e.organizationId == _userOrgId))
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  const fetchLocations = async () => {
    await getLocations({ organizationId: selectedOrgId })
      .then((response) => {
        setLocationList(response?.data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  const fetchLocationUsers = async () => {
    setLocationLoading(true)
    if (decodedToken?.role != 'superadmin') {
      setSelectedOrgId(decodedToken.organizationId)
    }
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
              <>
                <CCardHeader>
                  {decodedToken?.role != 'superadmin' ? (
                    ''
                  ) : (
                    <CCallout color="warning" className="p-2 m-1">
                      Select an Organization to add a new Location.
                    </CCallout>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong className="fontHeader me-2">Users</strong>

                    <CTooltip content="Add New Location Admin" placement="bottom">
                      <CButton
                        color="primary"
                        style={{ float: 'right', marginRight: 0 }}
                        onClick={() => {
                          setModal(true)
                          setEditData({ organizationId: selectedOrgId })
                          setIsEditUser(false)
                        }}
                        disabled={!selectedOrgId?.length}
                      >
                        ADD
                      </CButton>
                    </CTooltip>
                  </div>
                </CCardHeader>

                <CCardBody>
                  <div style={{ marginTop: 5 }}>
                    {decodedToken?.role === 'superadmin' ? (
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
                    ) : (
                      <CInputGroup style={{ marginBottom: 5 }}>
                        <CInputGroupText className="d-flex" id="basic-addon1">
                          Organization(s)
                        </CInputGroupText>
                        <AppLabel text={currentOrganization?.organizationName} />
                      </CInputGroup>
                    )}
                    <CTooltip content="Select...a Location.">
                      <CInputGroup style={{ marginBottom: 5 }}>
                        <CInputGroupText id="basic-addon1" style={{ paddingLeft: 42 }}>
                          Location(s)
                        </CInputGroupText>
                        <CFormSelect
                          id="locationList"
                          type="text"
                          name="locationList"
                          placeholder="All"
                          value={selectedLocId}
                          onChange={(e) => setSelectedLocId(e.target.value)}
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
                        <CTableHeaderCell scope="col">Location</CTableHeaderCell>
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
                              <CTableDataCell>{item?.vw_loc_users[0]?.locationName}</CTableDataCell>
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
                                      setIsEditUser(true)
                                    }}
                                  />
                                </CTooltip>
                              </CTableDataCell>
                            </CTableRow>
                          )
                        })
                      ) : (
                        <CTableRow>
                          <CTableDataCell colSpan={9}>
                            <CCallout color="warning">No Data Found</CCallout>{' '}
                          </CTableDataCell>
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
            </CCard>
          </CCol>
        </CRow>
      )}
      {modal && (
        <RegisterLocationUser
          setModal={setModal}
          editData={editData}
          locationList={locationsList}
          isEditUser={isEditUser}
          refreshLocationUsers={fetchLocationUsers}
        />
      )}
    </div>
  )
}

export default LocationUsers
