import React, { useEffect, useState } from 'react'
import { FaPhone, FaUser } from 'react-icons/fa'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import { MdLocationOn, MdMarkEmailUnread } from 'react-icons/md'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { Modal } from './Modal'

import avatar from "../assets/avatar.jpg"
import { ProductCard } from './ProductCard'
import { IconButton} from './productPage/IconButton'
import { fakeData } from './FakeData'
import { useAuth } from '../Context/AuthContext'
import { useUser } from '../Context/UserContext'
import { LoaderFullscreen } from './LoaderFullscreen'
import { database } from '../firebaseConfig'
import { useParams } from 'react-router-dom'
import { getDocs, onSnapshot, query, where } from 'firebase/firestore'

export const SellerProfile = () => {
    let { usernameParam } = useParams()
    
    // importing values from Contexts
    const { user, navigate, userRef, adsRef } = useAuth()
    const { userInfo, displayName, username, allUsernames } = useUser()
    // state manager for show/hiding elements
    const [showModal, setShowModal] = useState(false)
    const [pageData, setPageData] = useState({})
    const [sellerAds, setSellerAds] = useState([])

    
    // check if the param (from page address /param) which is username matches any username in the database
    // display details related to that username if checkUsernameAvailability returns true else navigate to error page
    const checkUsernameAvailability = allUsernames.some(element => element.username == usernameParam)


    // fetch page data using param as username
    useEffect(() => {
        const pageData = async () => {
            try{
                const q = query(userRef, where("username", "==", usernameParam))
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach((doc) => {
                    setPageData(doc.data());
                });
            }
            catch(err){
                console.log(err.message)
            }
        }
        pageData()
    }, [usernameParam])

    useEffect(() => {
        // fetch ads related to user
        const fetchSellerAds = async () => {
            try{
                const q = query(adsRef, where("posterEmail", "==", `${pageData.email}`), where("isActive", "==", true))
                await onSnapshot(q, snapShot => {
                  setSellerAds(snapShot.docs.map(data => ({
                    ...data.data()
                  })))
                })
            }
            catch(err){
                console.log(err.message)
            }
        }
        
        fetchSellerAds()

    }, [pageData])

    if(pageData === {}){
        return <LoaderFullscreen />
    }else if(allUsernames.length === 0){
        return <LoaderFullscreen />
    }else if(!checkUsernameAvailability){
        return navigate('error')
    }
    

  return (
    <div className='container' id='profile'>
        <div className='container--item'>
            <div className='header'>
                <div className='flex-col'>
                    <img src={avatar} alt="" />
                    <div className='flex-col'>
                        <h2>{pageData.displayName}</h2>
                        <p>Active Ads: {sellerAds.length}</p>
                        <p>Total Sales: {pageData.totalSales}</p>
                    </div>
                </div>
                <div>
                    <IconButton
                        link="sms:+23480123456789" 
                        icon={<BsFillChatLeftTextFill />}
                        title="Message Seller"
                    />
                    <IconButton 
                        link="tel:+23480123456789"
                        icon={<FaPhone />}
                        title="Call Seller"
                    />
                    {pageData.username == username 
                    &&
                    <IconButton 
                    link="/settings"
                    icon={<FaUser />}
                    title="Edit Page"
                    />
                    }
                </div>
            </div>

            <div className='address'>
                <h3 className='flex-row'>
                    <MdLocationOn /> {pageData.location}
                </h3>
                <br />
                <h3 className='flex-row'>
                    <MdMarkEmailUnread /> {pageData.email}
                </h3>
            </div>

            <div className='about'>
                <h2>About Seller:</h2>
                <p>{pageData.about ? pageData.about : <i>No Data added!</i>}</p>
            </div>

            <div className='reviews'>
                <h2 className='flex-row'>Reviews <BsFillArrowRightCircleFill /></h2>
            </div>

            <div className='active'>
                <h2>Active Ads:</h2>
                <div className='flex-row'>
                    {sellerAds.slice(0,8).map((item, index) => {
                        return <div className='flex-col' key={index}>
                                <ProductCard
                                image={item.itemImages}
                                name={item.itemName}
                                price={item.itemPrice}
                                category={item.itemCategory}
                                />
                                {user != null && user.email === pageData.email && <button className='btn--small error--background' onClick={() => setShowModal(prevState => !prevState)}>delete</button>}
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
        {showModal 
        && 
        <Modal>
            <h3>You're about to delete an Ad </h3>
            <h3>We will love to know.., </h3>
            <h4>Item has been sold?</h4>
        </Modal> 
        }
    </div>
  )
}
