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
} from '@coreui/react'
import SearchPagePanel from '../../../components/SearchPagePanel'
import { downloadFile } from '../../../services/FileService'

function SearchPages() {
  const [pagesList, setPagesList] = useState([])
  const [values, setValues] = useState({})
  const [visible, setVisible] = useState(false)
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

  async function handleViewFile(bPath) {
    await downloadFile(bPath).then((res) => {
      console.log('downloaded file', res.data)
      const file = new Blob([res.data], { type: 'application/pdf' })
      const fileURL = URL.createObjectURL(file)
      //window.open(fileURL)
      setVisible(true)
      setDownloaded(fileURL)
    })
  }
  return (
    <div>
      <SearchPagePanel
        fetchSearchPages={onSearchPages}
        pageCounts={pagesList?.length > 0 ? pagesList.length : ''}
      ></SearchPagePanel>
      {visible ? (
        <CModal visible={visible} onClose={() => setVisible(false)} aria-labelledby="View PDF Page">
          <CModalHeader onClose={() => setVisible(false)}>
            <CModalTitle id="viewPdfPage">Modal title</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <PDFViewer blob={downloaded}></PDFViewer>
          </CModalBody>
        </CModal>
      ) : (
        <CAccordion activeItemKey={-1}>
          {pagesList?.map((item, key) => {
            return (
              <CAccordionItem itemKey={key} key={key}>
                <CAccordionHeader>
                  {item.pageName}#{item.data.content.substring(1, 40)}
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow>
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
                              <div>
                                {key}: {item?.tags[key]}
                              </div>
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
                            onClick={() => handleViewFile(item.pageBlobPath)}
                          >
                            View
                          </CButton>
                          <CButton color="primary" href="#">
                            Download
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
      )}
    </div>
  )
}

export default SearchPages
