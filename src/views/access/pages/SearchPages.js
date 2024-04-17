import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { searchPagesByCriteria } from '../../../services/PageService'
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CTooltip,
  CSpinner,
  CRow,
} from '@coreui/react'
import SearchPagePanel from '../../../components/SearchPagePanel'

function SearchPages() {
  const [pagesList, setPagesList] = useState([])
  const [values, setValues] = useState({})
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  let _locationId = decodedToken.locationId
  useEffect(() => {
    fetchSearchPages({ arrival: '' })
  }, [])

  const fetchSearchPages = async (_params) => {
    await searchPagesByCriteria(_params)
      .then((response) => {
        console.log('PageList', response)

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
  return (
    <div>
      <SearchPagePanel fetchSearchPages={onSearchPages}></SearchPagePanel>
      <CAccordion activeItemKey={-1}>
        {pagesList?.map((item, key) => {
          return (
            <CAccordionItem itemKey={key} key={key}>
              <CAccordionHeader>
                {item.pageName}#{item.data.content.substring(1, 40)}
              </CAccordionHeader>
              <CAccordionBody>
                <Highlighter
                  highlightClassName="search-text-highlight"
                  autoEscape={true}
                  searchWords={Object.keys(values).map((key) => values[key])}
                  textToHighlight={item.data.content}
                >
                  {}
                </Highlighter>
              </CAccordionBody>
            </CAccordionItem>
          )
        })}
      </CAccordion>
    </div>
  )
}

export default SearchPages
