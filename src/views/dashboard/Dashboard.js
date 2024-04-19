import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { cibCcVisa } from '@coreui/icons'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTooltip,
  CModal,
  CModalTitle,
  CModalBody,
  CModalHeader,
} from '@coreui/react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'

import FileUpload from '../access/documents/FileUpload'
import DocumentsTable from '../../components/DocumentsTable'
import { downloadFile } from '../../services/FileService'
import PDFViewer from '../access/documents/PDFViewer'
import { jwtDecode } from 'jwt-decode'
import { getDocumentsByLocationId } from '../../services/FileService'
import pdfAvatarNew from '../../assets/pdfNew.png'
import pdfAvatarProgress from '../../assets/pdfProgress.png'
import pdfAvatarCompleted from '../../assets/pdfCompleted.png'
import pdfAvatarError from '../../assets/pdfError.png'
import moment from 'moment'

const Dashboard = () => {
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)

  const [visible, setVisible] = useState(false)
  const [downloaded, setDownloaded] = useState()
  const [userLocationId, setUserLocationId] = useState(decodedToken.locationId)
  const [tableExample, setTableExample] = useState([])

  const progressExample = [
    { title: 'Documents', value: '10', percent: 100, color: 'primary', showPercentage: false },
    { title: 'Pages', value: '86', percent: 20, color: 'info', showPercentage: false },
    { title: 'Subscription', value: 'Free', percent: 100, color: 'warning', showPercentage: false },
    { title: 'Limit', value: '100 Pages', percent: 100, color: 'danger', showPercentage: false },
    {
      title: 'Remaining',
      value: '14 Pages',
      percent: 40.15,
      color: 'primary',
      showPercentage: true,
    },
  ]

  async function downloadPdfFile(e) {
    await downloadFile(e).then((res) => {
      console.log('downloaded file', res.data)
      const file = new Blob([res.data], { type: 'application/pdf' })
      const fileURL = URL.createObjectURL(file)
      // window.open(fileURL)
      setVisible(true)
      setDownloaded(fileURL)
    })
  }

  async function closePdfView() {
    setVisible(false)
  }

  async function refreshFiles() {
    fetchDocuments()
    alert('File is Uploaded successfully.')
  }

  useEffect(() => {
    fetchDocuments()
  }, [userLocationId])

  const fetchDocuments = async () => {
    await getDocumentsByLocationId(userLocationId)
      .then((response) => {
        var dd = response.data.documents.map((d, e) => {
          let _cDate = moment(d.createdAt).format('MMM D, YYYY')
          let _pdfIcon = pdfAvatarNew
          let _pdfStatusColor = 'danger'
          switch (d.status) {
            case 'New':
              _pdfIcon = pdfAvatarNew
              _pdfStatusColor = 'info'
              break

            case 'Processing':
              _pdfIcon = pdfAvatarProgress
              _pdfStatusColor = 'warning'
              break

            case 'Completed':
              _pdfIcon = pdfAvatarCompleted
              _pdfStatusColor = 'success'
              break
            default:
              _pdfIcon = pdfAvatarError
              _pdfStatusColor = 'danger'
              break
          }
          return {
            avatar: { src: _pdfIcon, status: _pdfStatusColor },
            document: {
              name: d.fileName,
              status: d.status,
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

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={4}>
              <h4 id="documentManager" className="card-title mb-0">
                Upload
              </h4>
              <div className="small text-body-secondary">January - July 2023</div>
            </CCol>
            <CCol>
              <FileUpload className="float-end" refreshFiles={refreshFiles} />
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} {item.showPercentage ? '(' + item.percent + '%' + ')' : ''}
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
      <CRow>
        <CCol xs>
          {!visible ? (
            <CCard className="mb-4">
              <CCardHeader>Documents</CCardHeader>
              <CCardBody>
                <DocumentsTable downloadPdfFile={downloadPdfFile} tableExampleData={tableExample} />
              </CCardBody>
            </CCard>
          ) : (
            <CModal
              visible={visible}
              onClose={() => setVisible(false)}
              aria-labelledby="View PDF Page"
            >
              <CModalHeader onClose={() => setVisible(false)}></CModalHeader>
              <CModalBody>
                <PDFViewer blob={downloaded}></PDFViewer>
              </CModalBody>
            </CModal>
          )}
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
