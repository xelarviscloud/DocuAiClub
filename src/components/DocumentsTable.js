import React from 'react'

import { cilFile } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CAvatar,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

function DocumentsTable({ downloadPdfFile, tableExampleData }) {
  function handleViewFile(bPath) {
    downloadPdfFile(bPath)
  }
  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead className="text-nowrap">
        <CTableRow>
          <CTableHeaderCell className="bg-body-tertiary text-center">
            <CIcon icon={cilFile} />
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">Document</CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary text-center">Status</CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">Property</CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary text-center">User</CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {tableExampleData.map((item, index) => (
          <CTableRow v-for="item in tableItems" key={index}>
            <CTableDataCell className="text-center">
              <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.document.name}</div>
              <div className="small text-body-secondary text-nowrap">
                <span>{item.document.status}</span> | Created: {item.document.created}
              </div>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              {/* <CIcon size="xl" icon={item.country.flag} title={item.country.name} /> */}
              <span>{item.document.status}</span>
            </CTableDataCell>
            <CTableDataCell>
              <span>{item.document.locationName}</span>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              {/* <CIcon size="xl" icon={item.payment.icon} /> */}
              <span>
                {item.user.firstName} {item.user.lastName}
              </span>
            </CTableDataCell>
            <CTableDataCell>
              <div
                style={{ cursor: 'pointer' }}
                className="small text-body-secondary text-nowrap text-decoration-underline"
                onClick={() => handleViewFile(item.document.blobPath)}
              >
                View PDF
              </div>
              <div className="fw-semibold text-nowrap">{item.activity}</div>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default DocumentsTable
