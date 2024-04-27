import React from 'react'

function PDFViewer({ blob }) {
  return (
    <div style={{ height: '90vh', width: '90vw' }}>
      <iframe src={blob} width="100%" height="100%"></iframe>
    </div>
  )
}

export default PDFViewer
