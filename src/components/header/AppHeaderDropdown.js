import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilUserX,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const Role = localStorage.getItem('role')

  function removeCookie(name) {
    const expirationDate = new Date() // A past date

    const expires = 'expires=' + expirationDate.toUTCString()
    document.cookie = `${name}=; ${expires}; path=/`
  }

  const handleOnClick = () => {
    localStorage.removeItem('token')
    removeCookie('token')
    if (Role === 'superadmin') {
      localStorage.removeItem('role')
      localStorage.removeItem('username')
      localStorage.removeItem('email')
      navigate('/')
    } else if (Role === 'organizationuser') {
      localStorage.removeItem('role')
      localStorage.removeItem('username')
      localStorage.removeItem('email')
      localStorage.removeItem('is_verified')
      localStorage.removeItem('organizationid')
      localStorage.removeItem('organizationuserid')
      navigate('/')
    } else if (Role === 'locationuser') {
      localStorage.removeItem('role')
      localStorage.removeItem('username')
      localStorage.removeItem('email')
      localStorage.removeItem('is_verified')
      localStorage.removeItem('locationid')
      localStorage.removeItem('locationuserid')
      localStorage.removeItem('organizationid')
      navigate('/')
    }
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CIcon
          icon={cilUser}
          style={{
            height: '35',
            width: '30',
            color: '#212631',
            background: '#f9b115',
            borderRadius: 50,
            padding: 8,
          }}
        />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem href="/">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="/">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="/">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="/">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
        <CDropdownItem href="/">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="/">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        {/* <CDropdownItem href="/">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
         */}
        <CDropdownDivider />
        <CDropdownItem onClick={() => handleOnClick()}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
