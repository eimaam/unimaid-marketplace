import React from 'react'
import ReactDOM from 'react-dom';

export const Modal = ({handleClick, children}) => {
  return ReactDOM.createPortal(
    <>
    <div className='modal--overlay' />
      <div className='modal'>
          {children}
          <div className='flex-row'>
              <h2 onClick={handleClick}>YES</h2>
              <h2 onClick={handleClick}>NO</h2>
          </div>
      </div>
    </>
    ,
    document.getElementById('modal')
  )
}
