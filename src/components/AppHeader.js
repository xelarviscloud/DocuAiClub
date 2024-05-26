import { cilBell, cilContrast, cilInfo, cilMenu, cilMoon, cilSun } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavbarText,
  CNavItem,
  CNavLink,
  useColorModes,
  CBadge,
} from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { AppHeaderDropdown } from './header/index'
import { AppBreadcrumb } from './index'
import { getAlerts } from '../services/notificationService'
import { jwtDecode } from 'jwt-decode'

const AppHeader = () => {
  const [decodedToken, setDecodedToken] = useState({})
  const [userAlerts, setUserAlerts] = useState([])
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    setDecodedToken(JSON.parse(localStorage.getItem('userInfo')))

    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)

    const response = getAlerts({
      userId: decodedToken?.userId,
      userName: decodedToken?.userName,
      organizationId: decodedToken?.organizationId,
    }).then((res) => {
      console.log(res.data.uAlerts)
      setUserAlerts(res.data.uAlerts)
    })

    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  window.addEventListener('userInfo', () => {
    setDecodedToken(JSON.parse(localStorage.getItem('userInfo')))
  })

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/dashboard" as={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          {/* <CNavItem>
            <CNavLink href="/">Users</CNavLink>
          </CNavItem> */}
          {/* <CNavItem>
            <CNavLink href="/">Settings</CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav className=" d-none d-sm-flex flex-column ms-auto me-2 text-center">
          <CNavItem>
            <CNavbarText>
              Welcome <i>{decodedToken?.firstName + ', ' + decodedToken?.lastName}</i>
            </CNavbarText>
          </CNavItem>
          <CNavItem>
            <CNavbarText>{decodedToken?.roleDescription}</CNavbarText>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto ms-sm-1">
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              <CBadge color="danger" position="top-end" shape="rounded-pill">
                {userAlerts?.length} <span className="visually-hidden">unread messages</span>
              </CBadge>
              <CIcon icon={cilBell} size="xl" />
            </CDropdownToggle>
            <CDropdownMenu id="ddm-notifications">
              {userAlerts?.map((e, i) => {
                return (
                  <CDropdownItem
                    key={i}
                    active={colorMode === 'dark'}
                    className="d-flex align-items-center"
                    as="button"
                    type="button"
                  >
                    <CIcon className="me-2" icon={cilInfo} size="lg" /> {e?.description}
                  </CDropdownItem>
                )
              })}
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
