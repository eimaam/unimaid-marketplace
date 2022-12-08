import React from 'react'
import { IconButton, InfoButton } from './IconButton'
import { FaPhone } from 'react-icons/fa'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import avatar from "../../assets/avatar.jpg"
import { Link } from 'react-router-dom'


export const SellerCard = ({displayName, location, phoneNo, profileLink, numberOfActiveAds}) => {
  return (
    <div className='seller--profile'>
          <h2>SELLER INFO:</h2>
          <div className='seller--info'>
            <Link to={`../${profileLink}`}>
            <div>
              <img src={avatar} alt="" />
              <h2>{displayName}</h2>
              <div>
                <p><MdLocationOn /> {location}</p>
              </div>
            </div>
            </Link>
            <div className='flex-col'>
              <IconButton
              link="sms:+23480123456789" 
              icon={<BsFillChatLeftTextFill />}
              title="Message Seller"
              />
              <IconButton 
              link={`tel:+${phoneNo}`}
              icon={<FaPhone />}
              title="Call Seller"
              />
              <p>Active Ads: {numberOfActiveAds}</p>
            </div>
          </div>
        </div>
  )
}
