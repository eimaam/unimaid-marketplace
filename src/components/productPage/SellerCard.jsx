import React from 'react'
import { IconButton, InfoButton } from './IconButton'
import { FaPhone } from 'react-icons/fa'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import avatar from "../../assets/avatar.jpg"


export const SellerCard = ({displayName, location, phoneNo}) => {
  return (
    <div className='seller--profile'>
          <h2>SELLER INFO:</h2>
          <div className='seller--info'>
            <div>
              <img src={avatar} alt="" />
              <h2>{displayName}</h2>
              <div>
                <p><MdLocationOn /> {location}</p>
              </div>
            </div>
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
              <p>Active Ads: 2</p>
            </div>
          </div>
        </div>
  )
}
