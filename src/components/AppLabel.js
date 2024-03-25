import React from 'react'

const AppLabel = (props) => {
  const { text } = props

  return (
    <div
      className="d-flex align-items-center ps-1 w-100"
      style={{
        border: '1px solid #ddd',
        borderRadius: 3,
        //   width: '100%',
        //   display: 'flex',
        //   alignItems: 'center',
        //   paddingLeft: 15,
      }}
    >
      {text}
    </div>
  )
}

export default React.memo(AppLabel)
