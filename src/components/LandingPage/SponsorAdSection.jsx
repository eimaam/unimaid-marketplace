import React from 'react'

import cc from "../../assets/casual-life-3d-young-man-in-headset-using-computer.png"

export const SponsorAd = () => {
    
  return (
    <section className='ads--banner'>
        <div>
            <h1>Want to rank your Ads higher? 
                Want your Ads appearing at the top? 
                <br />
                Click here to learn about our Sponsored Ads
            </h1>
            <br />
            <button>Join Now!</button>
        </div>
        <div>

        <img src={cc} alt="" />
        </div>
    </section>
  )
}
