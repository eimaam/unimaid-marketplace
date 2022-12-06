import React from 'react'

import ads from "../../assets/3d-casual-life-searching-for-new-employees.png"

export const AdsBanner = () => {
    
  return (
    <section className='ads--banner'>
        <div>
            <h1>Get more recognized by Visitors! 
                <br /> Place your business Ad here to reach more customers/clients
            </h1>
            <br />
            <button><a href="/pushad">Click here for guidelines</a></button>
        </div>
        <div>

        <img src={ads} alt="" />
        </div>
    </section>
  )
}
