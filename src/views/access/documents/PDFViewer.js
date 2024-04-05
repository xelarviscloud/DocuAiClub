import React from 'react'

function PDFViewer({ blob }) {
  return (
    <div style={{ height: 1000, width: '100%' }}>
      <iframe src={blob} width="100%" height="100%"></iframe>
    </div>
  )
}

export default PDFViewer
