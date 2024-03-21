import React, { useEffect, useState } from 'react'
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
import Spinners from '../../base/spinners/Spinners'
import Paginations from '../../base/paginations/Paginations'
import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import formatPhoneNumber from '../../../services/Utility'
// API
import { getOrganizations } from '../../../services/OrganizationService'
import RegisterOrganization from '../register-organization/RegisterOrganization'

const Organizations = () => {
  const [modal, setModal] = useState(false)
  const [orgList, setOrgList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState()
  const [loading, setLoading] = useState(false)
  const [editData, setEditData] = useState({})

  useEffect(() => {
    fetchOrganizations()
  }, [orgList === undefined ? orgList : '', currentPage])

  const fetchOrganizations = async () => {
    setLoading(true)
    await getOrganizations({ currentPage: currentPage })
      .then((response) => {
        console.log('response', response)
        setOrgList(response?.data)
        setCount(response?.totalPages === 0 ? 1 : response?.totalPages)
        setLoading(false)
      })
      .catch((error) => {
        console.log('error', error)
        setLoading(false)
      })
  }

  const handleAddOrganization = (e) => {
    setModal(true)
    setEditData({})
  }

  return (
    <>
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
                    <strong className="fontHeader">Organizations</strong>
                    <CTooltip content="Add New Organization" placement="bottom">
                      <CButton
                        color="primary"
                        style={{ float: 'right', marginRight: 10 }}
                        onClick={(e) => handleAddOrganization(e)}
                      >
                        ADD
                      </CButton>
                    </CTooltip>
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
                          <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      {orgList?.length > 0 ? (
                        <CTableBody>
                          {orgList?.map((org, key) => {
                            return (
                              <CTableRow key={key}>
                                <CTableHeaderCell scope="row">{org?.name}</CTableHeaderCell>
                                <CTableDataCell>{org?.address_line1}</CTableDataCell>

                                <CTableDataCell>{org?.city}</CTableDataCell>
                                <CTableDataCell>{org?.state}</CTableDataCell>

                                <CTableDataCell>{org?.zip_code}</CTableDataCell>

                                <CTableDataCell>{org?.email}</CTableDataCell>
                                <CTableDataCell>
                                  {formatPhoneNumber(org?.phone_number)}
                                </CTableDataCell>
                                <CTableDataCell>
                                  <CTooltip content="Edit" placement="bottom">
                                    <CIcon
                                      icon={cilPencil}
                                      size="lg"
                                      color="primary"
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => {
                                        // e.stopPropagation()
                                        setModal(true)
                                        setEditData(
                                          orgList?.filter((item) => {
                                            return item?.organizationid === org?.organizationid
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
        <RegisterOrganization
          setModal={setModal}
          fetchOrganizations={fetchOrganizations}
          editData={editData}
        />
      )}
    </>
  )
}

export default Organizations
