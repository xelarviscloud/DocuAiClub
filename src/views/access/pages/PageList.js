import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { getPagesByLocationId } from '../../../services/PageService'
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CTooltip,
  CSpinner,
  CRow,
} from '@coreui/react'

function PageList() {
  const [pagesList, setPagesList] = useState([])

  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  let _locationId = decodedToken.locationId
  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    await getPagesByLocationId(_locationId)
      .then((response) => {
        console.log('PageList', response)
        setPagesList([])
        setPagesList(response?.data.pages)
        console.log(pagesList)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  return (
    <CAccordion activeItemKey={-1}>
      {pagesList?.map((item, key) => {
        return (
          <CAccordionItem itemKey={key} key={key}>
            <CAccordionHeader>
              {item.pageName}#{item.data.content.substring(1, 40)}
            </CAccordionHeader>
            <CAccordionBody>
              <strong></strong>
              {item.data.content}
            </CAccordionBody>
          </CAccordionItem>
        )
      })}
    </CAccordion>
  )
}

export default PageList
