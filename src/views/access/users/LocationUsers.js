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
import React from 'react'
import Spinners from '../../base/spinners/Spinners'
import Paginations from '../../base/paginations/Paginations'
import formatPhoneNumber from '../../../services/Utility'

function LocationUsers({
  setLocationModal,
  locationLoading,
  locationUserList,
  locationUserCurrentPage,
  setLocationUserCurrentPage,
  locationCount,
  decryptedData,
}) {
  return (
    <div>
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
                  <strong className="fontHeader">Location User</strong>
                  <CTooltip content="Add New Location User" placement="bottom">
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
                                    alt="decryptedData"
                                    style={{ width: 100, height: 100 }}
                                  />
                                }
                              </CTableHeaderCell>
                              <CTableDataCell>{item?.data?.username}</CTableDataCell>
                              <CTableDataCell>{item?.data?.firstName}</CTableDataCell>
                              <CTableDataCell>{item?.data?.lastName}</CTableDataCell>
                              <CTableDataCell>{item?.data?.email}</CTableDataCell>
                              <CTableDataCell>
                                {'+1 ' + formatPhoneNumber(item?.data?.mobileNumber)}
                              </CTableDataCell>
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
    </div>
  )
}

export default LocationUsers
