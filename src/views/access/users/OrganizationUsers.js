import { cibQq, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
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
import { getOrganizationUsers } from '../../../services/OrganizationService'
import formatPhoneNumber from '../../../services/Utility'
import Paginations from '../../base/paginations/Paginations'
import Spinners from '../../base/spinners/Spinners'
import RegisterOrganizationUser from '../organizations/RegisterOrganizationUser'

function OrganizationUsers() {
  const [orgLoading, setOrgLoading] = useState(false)
  const [orgUserList, setUserList] = useState([])
  const [orgUserCurrentPage, setOrgUserCurrentPage] = useState(1)
  const [orgCount, setOrgCount] = useState()
  const secretKey = 'alibaba1234@Devops&$%'
  const [modal, setModal] = useState(false)
  const [editData, setEditData] = useState({})
  const [isEditUser, setIsEditUser] = useState(false)
  /**
   * ORGANIZATION USER
   */
  useEffect(() => {
    fetchOrgUser()
  }, [orgUserList === undefined ? orgUserList : '', orgUserCurrentPage])

  const fetchOrgUser = async () => {
    setOrgLoading(true)
    await getOrganizationUsers({ currentPage: orgUserCurrentPage })
      .then((response) => {
        setUserList(response?.data)
        setOrgCount(response?.totalPages === 0 ? 1 : response?.totalPages)
        setOrgLoading(false)
        console.log('Org User List', response?.data)
      })
      .catch((error) => {
        console.log('error', error)
        setOrgLoading(false)
      })
  }

  return (
    <div>
      {!modal && (
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
                    <strong className="fontHeader">Admins</strong>
                    <CTooltip content="Add New Organization Admin" placement="bottom">
                      <CButton
                        color="primary"
                        style={{ float: 'right', marginRight: 0 }}
                        onClick={() => {
                          setModal(true)
                          setEditData({})
                          setIsEditUser(false)
                        }}
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
                          <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {orgUserList?.length > 0 ? (
                          orgUserList
                            ?.sort((a, b) => {
                              return a.userOrganizationId < b.userOrganizationId ? 1 : -1
                            })
                            ?.map((item, key) => {
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
                            <CTableDataCell className="d-flex justify-content-center">
                              No Data Found{' '}
                            </CTableDataCell>
                          </CTableRow>
                        )}
                      </CTableBody>
                    </CTable>
                  </CCardBody>
                  <Paginations
                    currentPage={orgUserCurrentPage}
                    setCurrentPage={setOrgUserCurrentPage}
                    count={orgCount}
                  />
                </>
              )}
            </CCard>
          </CCol>
        </CRow>
      )}
      {modal && (
        <RegisterOrganizationUser
          setModal={setModal}
          secretKey={secretKey}
          fetchOrgUser={fetchOrgUser}
          editData={editData}
          isEditUser={isEditUser}
        />
      )}
    </div>
  )
}

export default OrganizationUsers
