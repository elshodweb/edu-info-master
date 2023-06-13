import React from 'react'
import "./ErrorModal.scss"
function ErrorModal({message}) {
  return (
    <div className={message?"error-modal active":'error-modal'}>
      <span className='decorate'>!</span>
      <span>{message}</span>
    </div>
  )
}

export default ErrorModal