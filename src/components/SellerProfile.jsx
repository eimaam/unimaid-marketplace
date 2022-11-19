import React from 'react'
import { FaAt, FaLocationArrow, FaLongArrowAltRight, FaPhone, FaUser } from 'react-icons/fa'
import { CgMail } from 'react-icons/cg'

import avatar from "../assets/avatar.jpg"
import { ProductCard } from './ProductCard'
import { IconButton} from './productPage/IconButton'

export const SellerProfile = () => {
  return (
    <div className='container' id='profile'>
        <div className='container--item'>
            <div className='header'>
                <div>
                    <img src={avatar} alt="" />
                    <div>
                        <h2>Lead Tech Ventures Nig. Ltd</h2>
                        <p>Active Ads: 2</p>
                        <p>Total Sales: 12</p>
                    </div>
                </div>
                <div>
                    <IconButton
                        link="sms:+23480123456789" 
                        icon={<FaPhone />}
                        title="Message Seller"
                    />
                    <IconButton 
                        link="+23480123456789"
                        icon={<FaPhone />}
                        title="Call Seller"
                    />
                    <IconButton 
                        link="/settings"
                        icon={<FaUser />}
                        title="Edit Profile"
                    />
                </div>
            </div>

            <div className='address'>
                <h3 className='flex-row'><FaLocationArrow /> New Male 'A'</h3>
                <br />
                <h3 className='flex-row'><CgMail /> imamddahir@gmail.com</h3>
            </div>

            <div className='about'>
                <h2>About Seller:</h2>
                <p>...more details about Seller's Business/Brand</p>
            </div>

            <div className='reviews'>
                <h2 className='flex-row'>Reviews <FaLongArrowAltRight /></h2>
            </div>

            <div className='active'>
                <h2>Active Ads:</h2>
                <div className='flex-row'>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </div>
    </div>
  )
}
