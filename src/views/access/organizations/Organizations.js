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
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

// API
import { getOrganizations } from '../../../services/OrganizationService'

const Organizations = () => {
  const [orgList, setOrgList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchOrganizations() {
      const data = await getOrganizations({ currentPage: 1 })
      setOrgList(data.orgData)

      console.log('Get Organizations', data)
    }
    fetchOrganizations()
  }, [])

  const handleAddOrganization = (e) => {
    alert('')
    navigate('/access/register-organization')
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong className="fontHeader">Organizations</strong>
            <CButton
              color="primary"
              style={{ float: 'right' }}
              onClick={(e) => handleAddOrganization(e)}
            >
              ADD
            </CButton>
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
                  <CTableHeaderCell scope="col">Admin</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orgList?.map((org, key) => {
                  return (
                    <CTableRow key={key}>
                      <CTableHeaderCell scope="row">{org.name}</CTableHeaderCell>
                      <CTableDataCell>{org?.address_line1}</CTableDataCell>

                      <CTableDataCell>{org.city}</CTableDataCell>
                      <CTableDataCell>{org.state}</CTableDataCell>

                      <CTableDataCell>{org.zip_code}</CTableDataCell>
                      <CTableDataCell>{org.username}</CTableDataCell>

                      <CTableDataCell>{org.email}</CTableDataCell>
                      <CTableDataCell>{org.phone_number}</CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Organizations
