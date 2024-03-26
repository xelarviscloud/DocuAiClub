import React, { useEffect, useState } from 'react'
import Paginations from '../../base/paginations/Paginations'
import Spinners from '../../base/spinners/Spinners'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
  CBreadcrumb,
  CBreadcrumbItem,
} from '@coreui/react'
import formatPhoneNumber from '../../../services/Utility'
import CIcon from '@coreui/icons-react'
import { cilPencil } from '@coreui/icons'
import { getLocations } from '../../../services/LocationService'
import { getOrganizations } from '../../../services/OrganizationService'
import RegisterLocation from '../register-location/RegisterLocation'
import { jwtDecode } from 'jwt-decode'
import AppLabel from '../../../components/AppLabel'
function Locations() {
  const [modal, setModal] = useState(false)
  const [locationList, setLocationList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState()
  const [loading, setLoading] = useState(false)
  const [selectedOrgID, setSelectedOrgID] = useState()
  const [orgList, setOrgList] = useState([])
  const [editData, setEditData] = useState({})
  const [currentOrganization, setCurrentOrganization] = useState({})

  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  let _userOrgId = decodedToken.organizationId
  useEffect(() => {
    fetchOrganizations()
    setSelectedOrgID(_userOrgId)
  }, [])

  const fetchOrganizations = async () => {
    await getOrganizations({ currentPage: '' })
      .then((response) => {
        setOrgList(response?.data)
        console.log(orgList)
        setCurrentOrganization(response?.data?.find((e) => e.organizationId == _userOrgId))
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  useEffect(() => {
    fetchLocations()
  }, [locationList === undefined ? locationList : '', currentPage, selectedOrgID])

  const fetchLocations = async () => {
    setLoading(true)
    if (decodedToken.role == 'superadmin') {
      setSelectedOrgID(_userOrgId)
    }
    await getLocations({ organizationId: selectedOrgID, currentPage: currentPage })
      .then((response) => {
        setLocationList(response?.data)
        setCount(response?.totalPages === 0 ? 1 : response?.totalPages)
        setLoading(false)
      })
      .catch((error) => {
        console.log('error', error)
        setLoading(false)
      })
  }

  const handleAddLocation = (e) => {
    setModal(true)
    if (decodedToken.role == 'superadmin') {
      setEditData()
    } else {
      setEditData({ locationOrgId: _userOrgId })
    }
  }

  return (
    <div>
      {!modal && (
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Spinners />
                </div>
              ) : (
                <>
                  <CCardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ marginRight: '20px' }}>
                        <strong className="fontHeader">Organization:</strong>
                      </div>
                      {decodedToken?.role === 'superadmin' ? (
                        <CTooltip content="Select an Organization">
                          <CFormSelect
                            disabled={decodedToken?.role != 'superadmin'}
                            id="organizationList"
                            type="text"
                            name="organizationList"
                            placeholder="All Organizations"
                            value={selectedOrgID}
                            onChange={(e) => setSelectedOrgID(e.target.value)}
                          >
                            <option value="">All</option>
                            {orgList?.map((item) => (
                              <option key={item.organizationId} value={item?.organizationId}>
                                {item?.organizationName}
                              </option>
                            ))}
                          </CFormSelect>
                        </CTooltip>
                      ) : (
                        <AppLabel text={currentOrganization?.organizationName} />
                      )}

                      <CTooltip content="Add New Property" placement="bottom">
                        <CButton
                          color="primary"
                          style={{ float: 'right', marginLeft: 20, marginRight: 0 }}
                          onClick={(e) => handleAddLocation(e)}
                        >
                          ADD
                        </CButton>
                      </CTooltip>
                    </div>
                  </CCardHeader>
                  <CCardBody>
                    <CBreadcrumb>
                      <CBreadcrumbItem active>
                        <h5>Property(s)</h5>
                      </CBreadcrumbItem>
                    </CBreadcrumb>
                    <CTable>
                      <CTableHead>
                        <CTableRow style={{ backgroundColor: '#f3f4f7' }}>
                          <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                          <CTableHeaderCell scope="col">City</CTableHeaderCell>
                          <CTableHeaderCell scope="col">State</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Zip</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Organization</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      {locationList?.length > 0 ? (
                        <CTableBody>
                          {locationList?.map((item, key) => {
                            return (
                              <CTableRow key={item?.locationId}>
                                <CTableHeaderCell scope="row">
                                  {item?.locationName}
                                </CTableHeaderCell>
                                <CTableDataCell>{item?.addressLine1}</CTableDataCell>

                                <CTableDataCell>{item?.city}</CTableDataCell>
                                <CTableDataCell>{item?.state}</CTableDataCell>

                                <CTableDataCell>{item?.zipCode}</CTableDataCell>

                                <CTableDataCell>{item?.emailAddress}</CTableDataCell>
                                <CTableDataCell>
                                  {formatPhoneNumber(item?.phoneNumber)}
                                </CTableDataCell>
                                <CTableDataCell>
                                  {item?.vw_loc_orgs[0]?.organizationName}
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
                                        setEditData(
                                          locationList?.filter((item2) => {
                                            return item2?.locationId === item?.locationId
                                          })?.[0],
                                        )
                                      }}
                                    />
                                  </CTooltip>
                                </CTableDataCell>
                              </CTableRow>
                            )
                          })}
                        </CTableBody>
                      ) : (
                        <CTableBody>
                          <CTableRow>
                            <CTableDataCell>No Data Found </CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      )}
                    </CTable>
                  </CCardBody>
                  <Paginations
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    count={count}
                  />
                </>
              )}
            </CCard>
          </CCol>
        </CRow>
      )}
      {modal && (
        <RegisterLocation
          setModal={setModal}
          fetchLocations={fetchLocations}
          orgList={orgList}
          editData={editData}
        />
      )}
    </div>
  )
}

export default Locations
