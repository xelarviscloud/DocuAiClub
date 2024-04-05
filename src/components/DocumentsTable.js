import React, { useState, useEffect } from 'react'

import { cibCcMastercard, cibCcVisa, cifBr, cifUs, cilFile, cilSmile } from '@coreui/icons'
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

import { jwtDecode } from 'jwt-decode'

import avatar1 from '../assets/images/avatars/1.jpg'
import avatar2 from '../assets/images/avatars/2.jpg'
import pdfAvatar from '../assets/pdf.png'
import { getDocumentsByLocationId } from '../services/FileService'
import moment from 'moment'

const token = localStorage.getItem('token')
const decodedToken = jwtDecode(token)

function DocumentsTable({ downloadPdfFile }) {
  const [tableExample, setTableExample] = useState([])
  console.log(decodedToken)
  const _userLocId = decodedToken.locationId

  useEffect(() => {
    setTableExample([
      {
        avatar: { src: avatar1, status: 'success' },
        document: {
          name: 'Yiorgos Avraamu',
          status: 'New',
          created: 'Jan 1, 2023',
        },
        user: { name: 'USA', flag: cifUs },
        usage: {
          value: 50,
          period: 'Jun 11, 2023 - Jul 10, 2023',
          color: 'success',
        },
        payment: { name: 'Mastercard', icon: cibCcMastercard },
        activity: '10 sec ago',
      },
      {
        avatar: { src: avatar2, status: 'danger' },
        document: {
          name: 'Avram Tarasios',
          status: 'New',
          created: 'Jan 1, 2023',
        },
        user: { name: 'Brazil', flag: cifBr },
        usage: {
          value: 22,
          period: 'Jun 11, 2023 - Jul 10, 2023',
          color: 'info',
        },
        payment: { name: 'Visa', icon: cibCcVisa },
        activity: '5 minutes ago',
      },
    ])
    fetchDocuments()
  }, [_userLocId])

  const fetchDocuments = async () => {
    await getDocumentsByLocationId(_userLocId)
      .then((response) => {
        console.log('loc details', response)
        var dd = response.data.documents.map((d, e) => {
          console.log(d, e)
          console.log('date', new Date(d.createdAt))
          let _cDate = moment(d.createdAt).format('MMM D, YYYY')

          return {
            avatar: { src: pdfAvatar, status: 'danger' },
            document: {
              name: d.fileName,
              status: 'New',
              created: _cDate,
              locationName: d.locationName,
              blobPath: d.blobPath,
            },
            user: { firstName: d.firstName, lastName: d.lastName },
            usage: {
              value: 22,
              period: 'Jun 11, 2023 - Jul 10, 2023',
              color: 'info',
            },
            payment: { name: 'Visa', icon: cibCcVisa },
            activity: '5 minutes ago',
          }
        })
        setTableExample(dd)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  const getBadge = (status) => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Inactive':
        return 'secondary'
      case 'Pending':
        return 'warning'
      case 'Banned':
        return 'danger'
      default:
        return 'primary'
    }
  }
  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  function handleViewFile(bPath) {
    //alert(bPath)
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
        {tableExample.map((item, index) => (
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
              <div className="d-flex justify-content-between text-nowrap">
                {/* <div className="fw-semibold">{item.usage.value}%</div> */}
                <div className="ms-3">
                  <small className="text-body-secondary fw-semibold">
                    {item.document.locationName}
                  </small>
                </div>
              </div>
              <CProgress thin color={item.usage.color} value={item.usage.value} />
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
