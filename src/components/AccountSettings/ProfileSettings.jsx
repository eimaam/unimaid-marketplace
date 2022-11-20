import React from 'react'

export const ProfileSettings = ({option, setOption}) => {
  return (
    <aside>
        <h2>Profile Settings:</h2>
        <div className='info'>
            <div className='info--item'>
                <div>
                    <h4>Display Name:</h4>
                    <h3>Dave Chapel Enterprises</h3>
                </div>
                <button className='btn--small' onClick={() => setOption("display name")}>Change</button>
            </div>
            {option === "display name" &&
                <form action="">
                    <input 
                    type="text" 
                    placeholder='Enter New Name'
                    />
                    <button>Submit</button>
                </form>
            }
        </div>
        <div className='info'>
            <div className='info--item'>
                <div>
                    <h4>Change Display Photo:</h4>
                </div>
                <button className='btn--small' onClick={() => setOption("displayPhoto")}>Change</button>
            </div>
            {option === "displayPhoto" &&
                <form action="">
                    <input 
                    type="file" 
                    placeholder='Enter New Name'
                    />
                    <button type='submit'>Submit</button>
                </form>
            }
        </div>
    </aside>
  )
}
