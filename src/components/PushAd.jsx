import React from 'react'
import { useAuth } from '../Context/AuthContext'

export const PushAd = () => {
    const { user } = useAuth()
  return (
    <div className='container'>
        <div className='container--item'>
            <div>
                <h2>Lets help you reach more Customers/Visitors and sell faster with as low as N300</h2>
                <h3>Pay Now and make sales::</h3>
            </div>
            <form action="" style={{width: "100%"}}>
                <input type="text" name="" id="" placeholder={user.email}/>
                <input type="text" name="" id="" placeholder='enter product url'/>
                <i>you can get product url by clicking on the product and copying the url from the browser address bar tab </i>
                <input type="submit" value="submit" name="" id="" placeholder='enter product url'/>
            </form>
        </div>
    </div>
  )
}
