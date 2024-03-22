import React, { useState } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilGroup,
  cilHome,
  cilNotes,
  cilObjectGroup,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { jwtDecode } from 'jwt-decode'

const token = localStorage.getItem('token')
const decodedToken = jwtDecode(token)

const _nav =
  decodedToken?.role === 'superadmin'
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
          to: '/access/organizations',
          icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Property',
          to: '/access/locations',
          icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
        },

        {
          component: CNavGroup,
          name: 'Users',
          to: '/access/users',
          icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Organization Admin',
              to: '/access/organization-users',
            },
            {
              component: CNavItem,
              name: 'Property Admin',
              to: '/access/location-users',
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
          to: '/access/Documents',
          icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Search',
              to: '/access/search',
            },
            {
              component: CNavItem,
              name: 'Pages',
              to: '/access/pages',
            },
            {
              component: CNavItem,
              name: 'View',
              to: '/access/view',
            },
          ],
        },
        {
          component: CNavTitle,
          name: 'Training',
        },
        {
          component: CNavGroup,
          name: 'Manage',
          to: '/access/Documents',
          icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Search',
              to: '/access/search',
            },
            {
              component: CNavItem,
              name: 'Pages',
              to: '/access/pages',
            },
            {
              component: CNavItem,
              name: 'View',
              to: '/access/view',
            },
          ],
        },
        {
          component: CNavTitle,
          name: 'Maintenance',
        },
        {
          component: CNavGroup,
          name: 'Maintenance',
          to: '/access/Documents',
          icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Search',
              to: '/access/search',
            },
            {
              component: CNavItem,
              name: 'Pages',
              to: '/access/pages',
            },
            {
              component: CNavItem,
              name: 'View',
              to: '/access/view',
            },
          ],
        },
        {
          component: CNavTitle,
          name: 'Expense',
        },
        {
          component: CNavGroup,
          name: 'Expense',
          to: '/access/Documents',
          icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Search',
              to: '/access/search',
            },
            {
              component: CNavItem,
              name: 'Pages',
              to: '/access/pages',
            },
            {
              component: CNavItem,
              name: 'View',
              to: '/access/view',
            },
          ],
        },
        {
          component: CNavTitle,
          name: 'Components',
        },
        {
          component: CNavGroup,
          name: 'Base',
          to: '/base',
          icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Accordion',
              to: '/base/accordion',
            },
            {
              component: CNavItem,
              name: 'Breadcrumb',
              to: '/base/breadcrumbs',
            },
            {
              component: CNavItem,
              name: 'Cards',
              to: '/base/cards',
            },
            {
              component: CNavItem,
              name: 'Carousel',
              to: '/base/carousels',
            },
            {
              component: CNavItem,
              name: 'Collapse',
              to: '/base/collapses',
            },
            {
              component: CNavItem,
              name: 'List group',
              to: '/base/list-groups',
            },
            {
              component: CNavItem,
              name: 'Navs & Tabs',
              to: '/base/navs',
            },
            {
              component: CNavItem,
              name: 'Pagination',
              to: '/base/paginations',
            },
            {
              component: CNavItem,
              name: 'Placeholders',
              to: '/base/placeholders',
            },
            {
              component: CNavItem,
              name: 'Popovers',
              to: '/base/popovers',
            },
            {
              component: CNavItem,
              name: 'Progress',
              to: '/base/progress',
            },
            {
              component: CNavItem,
              name: 'Spinners',
              to: '/base/spinners',
            },
            {
              component: CNavItem,
              name: 'Tables',
              to: '/base/tables',
            },
            {
              component: CNavItem,
              name: 'Tooltips',
              to: '/base/tooltips',
            },
          ],
        },
        {
          component: CNavGroup,
          name: 'Buttons',
          to: '/buttons',
          icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Buttons',
              to: '/buttons/buttons',
            },
            {
              component: CNavItem,
              name: 'Buttons groups',
              to: '/buttons/button-groups',
            },
            {
              component: CNavItem,
              name: 'Dropdowns',
              to: '/buttons/dropdowns',
            },
          ],
        },
        {
          component: CNavGroup,
          name: 'Forms',
          icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Form Control',
              to: '/forms/form-control',
            },
            {
              component: CNavItem,
              name: 'Select',
              to: '/forms/select',
            },
            {
              component: CNavItem,
              name: 'Checks & Radios',
              to: '/forms/checks-radios',
            },
            {
              component: CNavItem,
              name: 'Range',
              to: '/forms/range',
            },
            {
              component: CNavItem,
              name: 'Input Group',
              to: '/forms/input-group',
            },
            {
              component: CNavItem,
              name: 'Floating Labels',
              to: '/forms/floating-labels',
            },
            {
              component: CNavItem,
              name: 'Layout',
              to: '/forms/layout',
            },
            {
              component: CNavItem,
              name: 'Validation',
              to: '/forms/validation',
            },
          ],
        },
        {
          component: CNavItem,
          name: 'Charts',
          to: '/charts',
          icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
        },
        {
          component: CNavGroup,
          name: 'Icons',
          icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'DocuAiClub',
              to: '/icons/coreui-icons',
              badge: {
                color: 'success',
                text: 'NEW',
              },
            },
            {
              component: CNavItem,
              name: 'CoreUI Flags',
              to: '/icons/flags',
            },
            {
              component: CNavItem,
              name: 'CoreUI Brands',
              to: '/icons/brands',
            },
          ],
        },
        {
          component: CNavGroup,
          name: 'Notifications',
          icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Alerts',
              to: '/notifications/alerts',
            },
            {
              component: CNavItem,
              name: 'Badges',
              to: '/notifications/badges',
            },
            {
              component: CNavItem,
              name: 'Modal',
              to: '/notifications/modals',
            },
            {
              component: CNavItem,
              name: 'Toasts',
              to: '/notifications/toasts',
            },
          ],
        },
        {
          component: CNavItem,
          name: 'Widgets',
          to: '/widgets',
          icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
          badge: {
            color: 'info',
            text: 'NEW',
          },
        },
        {
          component: CNavTitle,
          name: 'Extras',
        },
        {
          component: CNavGroup,
          name: 'Pages',
          icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Login',
              to: '/login',
            },
            {
              component: CNavItem,
              name: 'Register',
              to: '/register',
            },
            {
              component: CNavItem,
              name: 'Error 404',
              to: '/404',
            },
            {
              component: CNavItem,
              name: 'Error 500',
              to: '/500',
            },
          ],
        },
      ]
    : []

export default _nav
