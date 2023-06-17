import React from 'react'
import './NotFoundItem.scss'
import loading from './../../assets/img/loading-2.gif'
function NotFoundItem({thisElement,text}) {
  return (
    <div className='not-found'>
      <h2 className='not-found__title'>Not found {thisElement} for this {text}</h2>
      <img width={200} src={loading} alt="loading" />
      
    </div>
  )
}

export default NotFoundItem