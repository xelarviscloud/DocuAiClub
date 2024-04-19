import React, { useState } from 'react'
import Highlighter from 'react-highlight-words'
import { searchPagesByCriteria } from '../../../services/PageService'
import PDFViewer from '../../access/documents/PDFViewer'
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CButton,
  CBadge,
  CRow,
  CCol,
  CCardBody,
  CCardTitle,
  CCardText,
  CCard,
  CModal,
  CModalTitle,
  CModalBody,
  CModalHeader,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  COffcanvasBody,
  CCloseButton,
} from '@coreui/react'
import SearchPagePanel from '../../../components/SearchPagePanel'
import { downloadFile } from '../../../services/FileService'
import { dicPageTagsDisplayName } from '../../../services/Utility'
import Tables from './../../base/tables/Tables'

function SearchPages() {
  const [pagesList, setPagesList] = useState([])
  const [values, setValues] = useState({})
  const [visible, setVisible] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [sidebarDetails, setSidebarDetails] = useState({})
  const [downloaded, setDownloaded] = useState()

  const fetchSearchPages = async (_params) => {
    await searchPagesByCriteria(_params)
      .then((response) => {
        setPagesList([])
        setPagesList(response?.data)
        console.log(pagesList)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  async function onSearchPages(_params) {
    setValues(_params)
    await fetchSearchPages(_params)
  }

  async function handleViewFile(bPath, isView = true) {
    let _fileName = bPath.split('/')[1]

    await downloadFile(bPath).then((res) => {
      console.log('downloaded file', res.data)
      const file = new Blob([res.data], { type: 'application/pdf' })
      const fileURL = URL.createObjectURL(file)
      if (isView) {
        setVisible(true)
        setDownloaded(fileURL)
      } else {
        const link = document.createElement('a')
        link.href = fileURL
        link.setAttribute('download', _fileName) //or any other extension
        document.body.appendChild(link)
        link.click()
      }
    })
  }
  return (
    <div>
      <SearchPagePanel
        fetchSearchPages={onSearchPages}
        pageCounts={pagesList?.length > 0 ? pagesList.length : ''}
      ></SearchPagePanel>
      {sidebarVisible ? (
        <>
          {/* <CButton color="primary" onClick={() => setSidebarVisible(true)}>
            Toggle offcanvas
          </CButton> */}
          <COffcanvas
            placement="end"
            visible={sidebarVisible}
            onHide={() => setSidebarVisible(false)}
          >
            <COffcanvasHeader className="justify-content-between">
              <COffcanvasTitle>Details</COffcanvasTitle>
              <CCloseButton
                className="text-reset"
                onClick={() => {
                  document.body.style.overflow = 'auto'
                  setSidebarVisible(false)
                }}
              />
            </COffcanvasHeader>
            <COffcanvasBody>
              {sidebarDetails[0]?.cells?.map((cell) => (
                <p>{cell.content}</p>
              ))}
            </COffcanvasBody>
          </COffcanvas>
        </>
      ) : (
        ''
      )}
      {visible ? (
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader onClose={() => setVisible(false)}></CModalHeader>
          <CModalBody style={{ padding: 0 }}>
            <PDFViewer blob={downloaded}></PDFViewer>
          </CModalBody>
        </CModal>
      ) : (
        ''
      )}
      <CAccordion activeItemKey={-1}>
        {pagesList?.map((item, key) => {
          return (
            <CAccordionItem itemKey={key} key={key}>
              <CAccordionHeader>
                {item.pageName}#{item.data.content.substring(1, 40)} {key}
              </CAccordionHeader>
              <CAccordionBody>
                <CRow key={key}>
                  <CCol md={9}>
                    <Highlighter
                      highlightClassName="search-text-highlight"
                      autoEscape={true}
                      searchWords={Object.keys(values).map((key) => values[key])}
                      textToHighlight={item.data.content}
                    >
                      {}
                    </Highlighter>
                  </CCol>
                  <CCol md={3}>
                    <CCard className="text-center">
                      <CCardBody>
                        <CCardTitle>
                          {item.documentName.split('/')[1]} {item.pageName}
                        </CCardTitle>
                        <CCardText>
                          {Object.keys(item?.tags).map((key) => (
                            <span key={key} className="d-block" style={{ fontWeight: 500 }}>
                              {dicPageTagsDisplayName[key]}:<i> {item?.tags[key]}</i>
                            </span>
                          ))}
                        </CCardText>
                        <div className="position-relative">
                          <CBadge color="success" shape="rounded-pill" style={{ fontSize: 10 }}>
                            PDF Action Bar
                          </CBadge>{' '}
                        </div>
                        <CButton
                          color="primary"
                          href="#"
                          style={{ marginRight: 3 }}
                          onClick={() => handleViewFile(item.pageBlobPath, true)}
                        >
                          View
                        </CButton>
                        <CButton
                          color="primary"
                          href="#"
                          onClick={() => handleViewFile(item.pageBlobPath, false)}
                        >
                          Download
                        </CButton>
                        <CButton
                          color="link"
                          shape="rounded-0"
                          onClick={() => {
                            setSidebarVisible(true)
                            setSidebarDetails(item?.data?.tables)
                          }}
                        >
                          Details
                        </CButton>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </CAccordionBody>
            </CAccordionItem>
          )
        })}
      </CAccordion>
    </div>
  )
}

export default SearchPages
