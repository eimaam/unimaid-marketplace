import React from 'react'

export const ResetPass = () => {
  return (
    <div className='container' id='resetPass'>
        <form action="">
              <input 
              type="email" 
              placeholder='Registered Email'
              />
              <input 
              type="submit" 
              value="RESET"
              />
              <p>error message</p>
        </form>
    </div>
  )
}
