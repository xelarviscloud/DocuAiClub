import React from 'react'

const RequiredTag = (props) => {
  const { text } = props

  return (
    <b
      style={{
        color: '#fa8484',
      }}
    >
      {text ? text : '*'}
    </b>
  )
}

export default React.memo(RequiredTag)
