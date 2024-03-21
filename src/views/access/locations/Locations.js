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
} from '@coreui/react'
import formatPhoneNumber from '../../../services/Utility'
import CIcon from '@coreui/icons-react'
import { cilPencil } from '@coreui/icons'
import { getLocationList, getLocations } from '../../../services/LocationService'
import { getOrganizations } from '../../../services/OrganizationService'
import RegisterLocation from '../register-location/RegisterLocation'

function Locations() {
  const [modal, setModal] = useState(false)
  const [locationList, setLocationList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState()
  const [loading, setLoading] = useState(false)
  const [selectedOrgID, setSelectedOrgID] = useState()
  const [orgList, setOrgList] = useState([])
  const [editData, setEditData] = useState({})

  useEffect(() => {
    fetchorganizations()
  }, [])

  const fetchorganizations = async () => {
    await getOrganizations({ currentPage: '' })
      .then((response) => {
        setOrgList(response?.data)
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
    await (
      selectedOrgID
        ? getLocationList({ id: selectedOrgID, currentPage: currentPage })
        : getLocations({ currentPage: currentPage })
    )
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
    setEditData({})
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
                        <strong className="fontHeader">Property(s)</strong>
                      </div>
                      <CTooltip content="Select Organization">
                        <CFormSelect
                          id="organization"
                          type="text"
                          name="organizationid"
                          placeholder="All Organizations"
                          value={selectedOrgID}
                          onChange={(e) => setSelectedOrgID(e.target.value)}
                        >
                          <option value="">All</option>
                          {orgList?.map((item) => (
                            <option value={item?.organizationid}>{item?.name}</option>
                          ))}
                        </CFormSelect>
                      </CTooltip>
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
                              <CTableRow key={key}>
                                <CTableHeaderCell scope="row">{item?.data?.name}</CTableHeaderCell>
                                <CTableDataCell>{item?.data?.address_line1}</CTableDataCell>

                                <CTableDataCell>{item?.data?.city}</CTableDataCell>
                                <CTableDataCell>{item?.data?.state}</CTableDataCell>

                                <CTableDataCell>{item?.data?.zip_code}</CTableDataCell>

                                <CTableDataCell>{item?.data?.email}</CTableDataCell>
                                <CTableDataCell>
                                  {formatPhoneNumber(item?.data?.phone_number)}
                                </CTableDataCell>
                                <CTableDataCell>{item?.parentOrganization}</CTableDataCell>
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
                                            return (
                                              item2?.data?.locationid === item?.data?.locationid
                                            )
                                          })?.[0]?.data,
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
                        <div className="d-flex justify-content-center">
                          <div className="bold-text">No Data Found</div>
                        </div>
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
