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
import RegisterOrgUser from '../register-user/RegisterOrgUser'
import { getOrganizationUser } from '../../../services/OrganizationService'

function OrgUsers() {
  const [orgModal, setOrgModal] = useState(false)
  const [orgLoading, setOrgLoading] = useState(false)
  const [orgUserList, setOrgnUserList] = useState([])
  const [orgUserCurrentPage, setOrgUserCurrentPage] = useState(1)
  const [orgcount, setOrgCount] = useState()
  const secretKey = 'alibaba1234@Devops&$%'
  const decryptedData = decryptData(secretKey)

  /**
   * ORGANIZATION USER
   */
  useEffect(() => {
    fetchOrgUser()
  }, [orgUserList === undefined ? orgUserList : '', orgUserCurrentPage])

  const fetchOrgUser = async () => {
    setOrgLoading(true)
    await getOrganizationUser({ currentPage: orgUserCurrentPage })
      .then((response) => {
        setOrgnUserList(response?.data)
        setOrgCount(response?.totalPages === 0 ? 1 : response?.totalPages)
        setOrgLoading(false)
      })
      .catch((error) => {
        console.log('error', error)
        setOrgLoading(false)
      })
  }

  return (
    <div>
      {!orgModal && (
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              {orgLoading ? (
                <div className="d-flex justify-content-center">
                  <Spinners />
                </div>
              ) : (
                <>
                  <CCardHeader>
                    <strong className="fontHeader">Organization Admin</strong>
                    <CTooltip content="Add New Organization Admin" placement="bottom">
                      <CButton
                        color="primary"
                        style={{ float: 'right', marginRight: 10 }}
                        onClick={() => setOrgModal(true)}
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
                        {orgUserList?.length > 0 ? (
                          orgUserList?.map((item, key) => {
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
                    currentPage={orgUserCurrentPage}
                    setCurrentPage={setOrgUserCurrentPage}
                    count={orgcount}
                  />
                </>
              )}
            </CCard>
          </CCol>
        </CRow>
      )}
      {orgModal && (
        <RegisterOrgUser
          setOrgModal={setOrgModal}
          secretKey={secretKey}
          fetchOrgUser={fetchOrgUser}
        />
      )}
    </div>
  )
}

export default OrgUsers
