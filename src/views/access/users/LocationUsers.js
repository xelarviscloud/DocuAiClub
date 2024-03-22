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
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Spinners from '../../base/spinners/Spinners'
import Paginations from '../../base/paginations/Paginations'
import formatPhoneNumber, { decryptData } from '../../../services/Utility'
import { getLocationUser } from '../../../services/LocationService'
import RegisterLocationUser from '../register-user/RegisterLocationUser'

function LocationUsers() {
  const [locationmodal, setLocationModal] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationUserList, setLocationUserList] = useState([])
  const [locationUserCurrentPage, setLocationUserCurrentPage] = useState(1)
  const [locationCount, setLocationCount] = useState()
  const secretKey = 'alibaba1234@Devops&$%'
  const decryptedData = decryptData(secretKey)

  /**
   * LOCATION USER
   */
  useEffect(() => {
    fetchLocationUser()
  }, [locationUserList === undefined ? locationUserList : '', locationUserCurrentPage])

  const fetchLocationUser = async () => {
    setLocationLoading(true)
    await getLocationUser({ currentPage: locationUserCurrentPage })
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
      {!locationmodal && (
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
                    <strong className="fontHeader">Property Admin</strong>
                    <CTooltip content="Add New Property Admin" placement="bottom">
                      <CButton
                        color="primary"
                        style={{ float: 'right', marginRight: 10 }}
                        onClick={() => setLocationModal(true)}
                      >
                        ADD
                      </CButton>
                    </CTooltip>
                  </CCardHeader>
                  <CCardBody>
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
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {locationUserList?.length > 0 ? (
                          locationUserList?.map((item, key) => {
                            return (
                              <CTableRow key={key}>
                                <CTableHeaderCell scope="row">
                                  {
                                    <img
                                      src={`${decryptedData}${item?.data?.fileUrl}`}
                                      alt="fileUrl"
                                      style={{ width: 100, height: 100 }}
                                    />
                                  }
                                </CTableHeaderCell>
                                <CTableDataCell>{item?.data?.username}</CTableDataCell>
                                <CTableDataCell>{item?.data?.firstName}</CTableDataCell>
                                <CTableDataCell>{item?.data?.lastName}</CTableDataCell>
                                <CTableDataCell>{item?.data?.email}</CTableDataCell>
                                <CTableDataCell>
                                  {formatPhoneNumber(item?.data?.mobileNumber)}
                                </CTableDataCell>
                                <CTableDataCell>{item?.parentLocation}</CTableDataCell>
                                <CTableDataCell>{item?.parentOrganization}</CTableDataCell>
                              </CTableRow>
                            )
                          })
                        ) : (
                          <div className="d-flex justify-content-center">No Data Found</div>
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
      {locationmodal && (
        <RegisterLocationUser
          setLocationModal={setLocationModal}
          fetchLocationUser={fetchLocationUser}
          secretKey={secretKey}
        />
      )}
    </div>
  )
}

export default LocationUsers
