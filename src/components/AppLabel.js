import React from 'react'

const AppLabel = (props) => {
  const { text } = props

  return (
    <div
      className="d-flex align-items-center"
      style={{
        border: '1px solid #ddd',
        borderRadius: 6,
        flex: '1 1 auto',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftWidth: 0,
        width: '1%',
        paddingLeft: 14,
      }}
    >
      {text}
    </div>
  )
}

export default React.memo(AppLabel)
