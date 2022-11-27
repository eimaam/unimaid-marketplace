import React from 'react'

export const ContactSettings = ({option, setOption, phoneNo, email}) => {
  return (
    <aside>
        <h2>Contact Details:</h2>
        <div className='info'>
            <div className='info--item'>
                <div>
                    <h4>Phone Number:</h4>
                    <h3>{phoneNo}</h3>
                </div>
                <button className='btn--small' onClick={() => setOption("phoneNo")}>Change</button>
            </div>
            {option === "phoneNo" &&
                <form action="">
                    <input 
                    type="text" 
                    placeholder='Enter New Phone Number'
                    />
                    <button type='submit'>Submit</button>
                </form>
            }
        </div>
        <div className='info'>
            <div className='info--item'>
                <div>
                    <h4>Contact Email:</h4>
                    <h3>{email}</h3>
                </div>
                <button className='btn--small' onClick={() => setOption("email")}>Change</button>
            </div>
            {option === "email" &&
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
