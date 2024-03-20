import React from 'react'
import { CCol, CPagination, CPaginationItem, CRow } from '@coreui/react'

const Paginations = ({ currentPage, setCurrentPage, count }) => {
  const totalPages = Math.ceil(count / 10)

  const next = () => {
    if (currentPage === totalPages) return

    setCurrentPage(currentPage + 1)
  }

  const prev = () => {
    if (currentPage === 1) return

    setCurrentPage(currentPage - 1)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CPagination className="justify-content-center" aria-label="Page navigation example">
          <CPaginationItem
            onClick={prev}
            disabled={currentPage === 1}
            style={{ cursor: currentPage === 1 ? '' : 'pointer' }}
          >
            Previous
          </CPaginationItem>
          <CPaginationItem>{currentPage}</CPaginationItem>
          <CPaginationItem
            onClick={next}
            disabled={currentPage === totalPages}
            style={{ cursor: currentPage === totalPages ? '' : 'pointer' }}
          >
            Next
          </CPaginationItem>
        </CPagination>
      </CCol>
    </CRow>
  )
}

export default Paginations
