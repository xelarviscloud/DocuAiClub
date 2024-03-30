import { CContainer, CSpinner } from '@coreui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Spinners from '../views/base/spinners/Spinners'
import React, { Suspense, useEffect, useState } from 'react'
// routes config
import routes from '../routes'

const AppContent = () => {
  const [items, setItems] = useState('0')

  useEffect(() => {
    window.addEventListener('storage', () => {
      setItems(localStorage.getItem('spinner-state'))
    })
  }, [items])

  return (
    <CContainer className="px-4" lg style={{ position: 'relative' }}>
      {items === '1' ? (
        <div className="text-center" style={{ position: 'absolute', left: '45%', zIndex: 99999 }}>
          <CSpinner color="info" />
        </div>
      ) : (
        ''
      )}
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="login" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
