import React, { useState } from 'react'
import { searchDocumentsByCriteria, shareDocument } from '../../../services/PageService'
import PDFViewer from '../../access/documents/PDFViewer'
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CBadge,
  CRow,
  CCol,
  CCardBody,
  CCard,
  CCardHeader,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  COffcanvasBody,
  CCloseButton,
  CCardFooter,
} from '@coreui/react'
import { downloadFile } from '../../../services/FileService'
import SearchDocumentPanel from '../../../components/SearchDocumentPanel'
import { auto } from '@popperjs/core'
import moment from 'moment'
import ShareModal from '../../../components/ShareModal'
import { FaShareAlt } from 'react-icons/fa'
import { LuBookOpen } from 'react-icons/lu'
import AppToolTip from '../../../components/AppToolTip'

function SearchDocuments() {
  const [documentsList, setDocumentsList] = useState([])
  const [values, setValues] = useState({})
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [downloaded, setDownloaded] = useState()
  const [shareModalVisibleState, setShareModalVisibleState] = useState(false)
  const [shareFileBlobPath, setShareFileBlobPath] = useState(null)

  const fetchSearchDocuments = async (_params) => {
    await searchDocumentsByCriteria(_params)
      .then((response) => {
        setDocumentsList(
          response?.data?.documentsWithPages?.sort(function (a, b) {
            return moment(b.createdAt) - moment(a.createdAt)
          }),
        )
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

  async function handleSharePage(bPath, isView = true) {
    console.log(bPath)
    setShareModalVisibleState(true)
    setShareFileBlobPath(bPath)
  }

  return (
    <div>
      <CRow>
        <SearchDocumentPanel
          fetchSearchDocuments={onSearchDocuments}
          pageCounts={documentsList?.length > 0 ? documentsList.length : ''}
        ></SearchDocumentPanel>
      </CRow>
      <ShareModal
        title={'Share Document'}
        visibleState={shareModalVisibleState}
        setVisibleState={setShareModalVisibleState}
        blobStoragePath={shareFileBlobPath}
        func={shareDocument}
      ></ShareModal>
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
                        e.stopPropagation()
                        e.nativeEvent.stopImmediatePropagation()
                        handleViewFile(item.blobPath)
                      }}
                    >
                      <AppToolTip
                        tooltip="View Document"
                        component={
                          <LuBookOpen style={{ color: '#3d99f5' }} className="iconSize22" />
                        }
                      ></AppToolTip>
                    </div>
                    <div
                      style={{ cursor: 'pointer' }}
                      className="small text-body-secondary text-nowrap text-decoration-underline ms-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        e.nativeEvent.stopImmediatePropagation()
                        handleSharePage(item.blobPath, true)
                      }}
                    >
                      <AppToolTip
                        tooltip="Share Document"
                        component={<FaShareAlt className="iconSize22" />}
                      ></AppToolTip>
                    </div>
                    <CBadge
                      color="info"
                      shape="rounded-pill"
                      className="badge-no-fill text-bg-info"
                    >
                      Pages#
                      {item?.pageCount ?? 0}
                    </CBadge>
                  </CAccordionHeader>

                  <CAccordionBody style={{ whiteSpace: 'nowrap' }}>
                    <div style={{ overflowX: auto, paddingBottom: '0.5rem' }}>
                      {item?.vw_doc_pages?.length > 0
                        ? item?.vw_doc_pages?.map((page, i) => {
                            return (
                              <CCard className="card-horizontal-slider" key={i}>
                                <CCardHeader>{page?.pageName}</CCardHeader>
                                <CCardBody
                                  style={{ maxWidth: 350, whiteSpace: 'initial', overflowY: auto }}
                                  className="card-body-slider"
                                >
                                  {page?.data?.content}
                                </CCardBody>
                                <CCardFooter className="text-body-secondary">
                                  {moment(page?.createdAt).fromNow()}
                                </CCardFooter>
                              </CCard>
                            )
                          })
                        : ''}
                    </div>
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
