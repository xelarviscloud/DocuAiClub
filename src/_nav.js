import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilGroup,
  cilHome,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { jwtDecode } from 'jwt-decode'
import React from 'react'

const token = localStorage.getItem('token')
const decodedToken = jwtDecode(token)
console.log('jwt-token', decodedToken)
const isUserSuperAdmin = decodedToken && decodedToken?.role == 'superadmin' ? true : false
const isUserOrgAdmin = decodedToken && decodedToken?.role == 'organizationuser' ? true : false
const isUserLocAdmin = decodedToken && decodedToken?.role == 'locationuser' ? true : false
const _nav = isUserSuperAdmin
  ? [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        badge: {
          color: 'info',
          text: 'NEW',
        },
      },
      {
        component: CNavTitle,
        name: 'ACCESS',
      },
      {
        component: CNavItem,
        name: 'Organizations',
        to: '/organizations',
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Properties',
        to: '/locations',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      },
      {
        component: CNavGroup,
        name: 'Users',
        to: '/users',
        icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Organization',
            to: '/organization-users',
          },
          {
            component: CNavItem,
            name: 'Property',
            to: '/location-users',
          },
        ],
      },
      {
        component: CNavTitle,
        name: 'Documents',
      },
      {
        component: CNavGroup,
        name: 'Manage',
        to: '/Documents',
        icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
        items: [
          {
            component: CNavItem,
            name: 'Search',
            to: '/search',
          },
          {
            component: CNavItem,
            name: 'Pages',
            to: '/pages',
          },
        ],
      },
    ]
  : isUserOrgAdmin
    ? [
        {
          component: CNavItem,
          name: 'Dashboard',
          to: '/dashboard',
          icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
          badge: {
            color: 'info',
            text: 'NEW',
          },
        },
        {
          component: CNavTitle,
          name: 'ACCESS',
        },
        {
          component: CNavItem,
          name: 'Organization',
          to: '/organization-details',
          icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Properties',
          to: '/locations',
          icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
        },
        {
          component: CNavGroup,
          name: 'Users',
          to: '/users',
          icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Property',
              to: '/location-users',
            },
          ],
        },
        {
          component: CNavTitle,
          name: 'Documents',
        },
        {
          component: CNavGroup,
          name: 'Manage',
          to: '/Documents',
          icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Search',
              to: '/search',
            },
            {
              component: CNavItem,
              name: 'Pages',
              to: '',
            },
          ],
        },
      ]
    : isUserLocAdmin
      ? [
          {
            component: CNavItem,
            name: 'Dashboard',
            to: '/dashboard',
            icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
            badge: {
              color: 'info',
              text: 'NEW',
            },
          },
          {
            component: CNavTitle,
            name: 'ACCESS',
          },
          {
            component: CNavItem,
            name: 'Organization',
            to: '/organization-details',
            icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
          },
          {
            component: CNavItem,
            name: 'Property',
            to: '/location-details',
            icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
          },

          {
            component: CNavTitle,
            name: 'Documents',
          },
          {
            component: CNavGroup,
            name: 'Manage',
            to: '/Documents',
            icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
            items: [
              {
                component: CNavItem,
                name: 'Search',
                to: '/search',
              },
              {
                component: CNavItem,
                name: 'Pages',
                to: '/page-list',
              },
            ],
          },
        ]
      : []

export default _nav
