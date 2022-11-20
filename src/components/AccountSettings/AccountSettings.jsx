import React from 'react'

export const AccountSettings = ({option, setOption}) => {
  return (
    <aside>
        <h2>Account Settings:</h2>
        <div className='info'>
            <div className='info--item'>
                <div>
                    <h3>Password</h3>
                </div>
                <button className='btn--small' onClick={() => setOption("password")}>Change</button>
            </div>
            {option === "password" &&
                <form action="">
                <input 
                type="password" 
                placeholder='Enter New Password'
                />
                <button type='submit'>Submit</button>
                </form>
            }
        </div>
        <div className='info'>
            <div className='info--item'>
                <div>
                    <h3>Delete Account</h3>
                </div>
                <button className='btn--small error--background' >Delete Account</button>
            </div>
            {option === "delete" &&
                <form action="">
                    <input 
                    type="email" 
                    placeholder='Enter New Email'
                    />
                    <button type='submit'>Submit</button>
                </form>
            }
        </div>
    </aside>
  )
}
