import React, { useEffect, useState } from 'react'
import { FaLocationArrow, FaLongArrowAltRight, FaPhone, FaUser } from 'react-icons/fa'
import { CgMail } from 'react-icons/cg'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import { MdLocationOn, MdMarkEmailUnread } from 'react-icons/md'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import {ConfirmationModal} from './ConfirmationModal'

import avatar from "../assets/avatar.jpg"
import { ProductCard } from './ProductCard'
import { IconButton} from './productPage/IconButton'
import { fakeData } from './FakeData'
import { useAuth } from '../Context/AuthContext'
import { useUser } from '../Context/UserContext'
import { LoaderFullsceen } from './LoaderFullscreen'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { database } from '../firebaseConfig'
import { useParams } from 'react-router-dom'

export const SellerProfile = () => {
    let { id } = useParams
    // importing values from Contexts
    const {user, loading, setLoading} = useAuth()
    const { userInfo, userAds, displayName, isVerified, phoneNo, location, staysHostel, joinedOn } = useUser()
    // state manager for show/hiding elements
    const [showModal, setShowModal] = useState(false)
    
    if(user === null){
        return <LoaderFullsceen />
    }
    
  return (
    <div className='container' id='profile'>
        <div className='container--item'>
            <div className='header'>
                <div className='flex-col'>
                    <img src={avatar} alt="" />
                    <div className='flex-col'>
                        <h2>{displayName}</h2>
                        <p>Active Ads: 2</p>
                        <p>Total Sales: 12</p>
                    </div>
                </div>
                <div>
                    <IconButton
                        link="sms:+23480123456789" 
                        icon={<BsFillChatLeftTextFill />}
                        title="Message Seller"
                    />
                    <IconButton 
                        link="+23480123456789"
                        icon={<FaPhone />}
                        title="Call Seller"
                    />
                    {user 
                    &&
                    <IconButton 
                    link="/settings"
                    icon={<FaUser />}
                    title="Edit Profile"
                    />
                    }
                </div>
            </div>

            <div className='address'>
                <h3 className='flex-row'>
                    <MdLocationOn /> {location}
                </h3>
                <br />
                <h3 className='flex-row'>
                    <MdMarkEmailUnread /> {user.email}
                </h3>
            </div>

            <div className='about'>
                <h2>About Seller:</h2>
                <p>Dealer of all types of iPhones, iWatches, iPads, MacBooks and all Apple products - Brand New, UK Used, US-used and Nigerian Used. 
                    <br />
                    Contact me via the Phone Number or Email above. 
                </p>
            </div>

            <div className='reviews'>
                <h2 className='flex-row'>Reviews <BsFillArrowRightCircleFill /></h2>
            </div>

            <div className='active'>
                <h2>Active Ads:</h2>
                <div className='flex-row'>
                    {userAds.slice(0,8).map((item, index) => {
                        return <div className='flex-col' key={index}>
                                <ProductCard
                                image={item.itemImage}
                                name={item.itemName}
                                price={item.itemPrice}
                                category={item.itemCategory}
                                />
                                {user && <button className='btn--small error--background' onClick={() => setShowModal(prevState => !prevState)}>delete</button>}
                                </div>
                    })}
                </div>
            </div>
            {user
            &&
            <div className='reviews'>
                <h2 className='flex-row'>
                    Manage Ads <BsFillArrowRightCircleFill />
                </h2>
            </div>
            }
        </div>
        {showModal && <ConfirmationModal /> }
    </div>
  )
}
