import React, { useState } from 'react'
import Highlighter from 'react-highlight-words'
import { searchDocumentsByCriteria, searchPagesByCriteria } from '../../../services/PageService'
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
  CCardHeader,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  COffcanvasBody,
  CCloseButton,
  CCardFooter,
  CCarousel,
  CCarouselItem,
  CCarouselCaption,
  CImage,
} from '@coreui/react'
import SearchPagePanel from '../../../components/SearchPagePanel'
import { downloadFile } from '../../../services/FileService'
import { dicPageTagsDisplayName } from '../../../services/Utility'
import Tables from './../../base/tables/Tables'
import SearchDocumentPanel from '../../../components/SearchDocumentPanel'
import ReactImg from '../../../assets/react-img.jpg'
import { auto } from '@popperjs/core'
function SearchDocuments() {
  const [documentsList, setDocumentsList] = useState([])
  const [values, setValues] = useState({})
  const [visible, setVisible] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [sidebarDetails, setSidebarDetails] = useState({})
  const [downloaded, setDownloaded] = useState()

  const fetchSearchDocuments = async (_params) => {
    await searchDocumentsByCriteria(_params)
      .then((response) => {
        setDocumentsList(response?.data?.documentsWithPages)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  async function onSearchDocuments(_params) {
    setDocumentsList([])
    setValues(_params)
    await fetchSearchDocuments(_params)
  }

  async function handleViewFile(bPath, isView = true) {
    let _fileName = bPath.split('/')[1]

    await downloadFile(bPath).then((res) => {
      const file = new Blob([res.data], { type: 'application/pdf' })
      const fileURL = URL.createObjectURL(file)
      if (isView) {
        setSidebarVisible(true)
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
      <CRow>
        <SearchDocumentPanel
          fetchSearchDocuments={onSearchDocuments}
          pageCounts={documentsList?.length > 0 ? documentsList.length : ''}
        ></SearchDocumentPanel>
      </CRow>

      <CRow>
        <CCol>
          <CAccordion activeItemKey={-1}>
            {documentsList?.map((item, key) => {
              return (
                <CAccordionItem itemKey={key} key={key}>
                  <CAccordionHeader>
                    #{key + 1}: {item?.fileName.substring(0, 40)}
                    <div
                      style={{ cursor: 'pointer' }}
                      className="small text-body-secondary text-nowrap text-decoration-underline ms-2"
                      onClick={(e) => {
                        console.log('accordion event', item)
                        e.stopPropagation()
                        e.nativeEvent.stopImmediatePropagation()
                        handleViewFile(item.blobPath)
                      }}
                    >
                      View PDF
                    </div>
                    <CBadge color="info" shape="rounded-pill" className="badge-no-fill">
                      Pages#
                      {item?.pageCount ?? 0}
                    </CBadge>
                  </CAccordionHeader>

                  <CAccordionBody style={{ whiteSpace: 'nowrap', overflowX: auto }}>
                    {item?.vw_doc_pages?.length > 0
                      ? item?.vw_doc_pages?.map((page, key) => {
                          return (
                            <CCard className="card-horizontal-slider">
                              <CCardHeader>{page?.pageName}</CCardHeader>
                              <CCardBody
                                style={{ maxWidth: 350, whiteSpace: 'initial' }}
                                className="card-body-slider"
                              >
                                {page?.data?.content}
                              </CCardBody>
                              <CCardFooter className="text-body-secondary">2 days ago</CCardFooter>
                            </CCard>
                          )
                        })
                      : ''}
                  </CAccordionBody>
                </CAccordionItem>
              )
            })}
          </CAccordion>

          {/* <CCarousel controls indicators dark>
            <CCarouselItem>
              <CImage className="d-block w-100" src={ReactImg} alt="slide 1" />
              <CCarouselCaption className=" d-md-block">
                <h5>First slide label</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </CCarouselCaption>
            </CCarouselItem>
            <CCarouselItem>
              <CImage className="d-block w-100" src={ReactImg} alt="slide 2" />
              <CCarouselCaption className=" d-md-block">
                <h5>Second slide label</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </CCarouselCaption>
            </CCarouselItem>
            <CCarouselItem>
              <CImage className="d-block w-100" src={ReactImg} alt="slide 3" />
              <CCarouselCaption className=" d-md-block">
                <h5>Third slide label</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </CCarouselCaption>
            </CCarouselItem>
          </CCarousel> */}
        </CCol>
      </CRow>

      <>
        <COffcanvas
          id="pdfView"
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
            <PDFViewer blob={downloaded}></PDFViewer>
          </COffcanvasBody>
        </COffcanvas>
      </>
    </div>
  )
}

export default SearchDocuments
