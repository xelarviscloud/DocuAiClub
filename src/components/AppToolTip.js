import React from 'react'
import { CTooltip } from '@coreui/react'

const AppToolTip = (props) => {
  const { tooltip, component, placement } = props

  return (
    <CTooltip content={tooltip} trigger={['hover']}>
      <span className="d-inline-block" tabIndex={0}>
        {component}
      </span>
    </CTooltip>
  )
}

export default React.memo(AppToolTip)
