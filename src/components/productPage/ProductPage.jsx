import React, { useEffect, useState } from 'react'
import { ProductCard } from "../ProductCard"
import { IconButton, InfoButton } from './IconButton'
import phone1 from "../../assets/smartphone1.png"
import phone2 from "../../assets/smartphone2.jpg"
import { FaArrowAltCircleRight, FaLandmark, FaLocationArrow, FaLongArrowAltRight, FaPhone, FaSearchLocation } from 'react-icons/fa'
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import avatar from "../../assets/avatar.jpg"
import { fakeData } from '../FakeData'
import { ConfirmationModal } from '../ConfirmationModal'
import { useAuth } from '../../Context/AuthContext'
import { onSnapshot, query, where } from 'firebase/firestore'
import { BarLoader } from 'react-spinners'

export const ProductPage = () => {
  const { usersRef, adsRef, loading, setLoading } = useAuth()
  const [showModal, setShowModal] = useState(false)

  const [item, setItem] = useState({})

  useEffect(() => {
    const fetchAd = async () => {
      setLoading(true)
      try{
        const q = query(adsRef, where("id", "==", "electronics/philips%20iron/211122"))
        await onSnapshot(q, snapShot => {
          setItem(snapShot.docs.map(data => ({
            ...data.data()
          })))
        })
        setLoading(false)
      }
      catch(err){
        console.log(err)
      }
    }

    fetchAd()
    
  }, [])

  // display loading animation if data is not ready
  if(item[0] == undefined){
    return <div className='container'>
              <div className='container--item'>
                <BarLoader />
              </div>
            </div>
  }

  const data = {
    poster: item[0].poster,
    category: item[0].category,
    itemName: item[0].itemName,
    itemPrice: item[0].itemPrice,
    itemBrand: item[0].itemBrand,
    itemCondition: item[0].itemCondition,
    itemColour: item[0].itemColour,
    itemManufacturingYear: item[0].itemManufacturingYear,
    itemPurchaseYear: item[0].itemPurchaseYear,
    receipt: item[0].receipt,
    itemDetails: item[0].itemDetails,
    itemImages: item[0].itemImage,
    isSponsored: item[0].isSponsored,
    id: item[0].id
  }

  const {poster, category, itemName, itemPrice, itemBrand, itemCondition, itemColour, 
        itemManufacturingYear, itemPurchaseYear, receipt, itemDetails, itemImages, isSponsored, id} = data
  
  
  return (
    <div className='product--page'>
      <div className='product--images'>
        <div className='main--image--container'>
          <img src={itemImages[0]} alt="" className='main'/>
        </div>
          <div className='more--images--container'>
            {itemImages.map((item, index) => {
              return <img key={index} src={item} alt={item.name} />
            })}
          </div>
        </div>

        <div className='product--info'>
          <h2>{itemName}</h2>
          <h2>{`₦ ${itemPrice}`}</h2>
        </div>
            {/* close Ad button */}
        <div>
          <button className='error--background' onClick={() => setShowModal(prev => !prev)}>Close Ad</button>
        </div>

        <div className='product--stat'>
          <div>
            <div className='item'>
              <p>
                Product Condiiton: 
              </p>
              <b>
                {itemCondition}
              </b>
            </div>
            <div>
              <p>
                Colour: 
              </p>
              <b>
                {itemColour}
              </b>
            </div>
            <div>
              <p>
                Manufacturing Year: 
              </p>
              <b>
                {itemManufacturingYear}
              </b>
            </div>
          </div>
          <div>
            <div>
              <p>
                Brand: 
              </p>
              <b>
                {itemBrand}
              </b>
            </div>
            <div>
              <p>
                Receipt: 
              </p>
              <b>
                {receipt}
              </b>
            </div>
            <div>
              <p>
                Purchase Year: 
              </p>
              <b>
                {itemPurchaseYear}
              </b>
            </div>
          </div>
        </div>

        <div className='safety--measures'>
          <h3>Safety Measures</h3>
          <p>Few safety tips for a favourable Trade</p>
          <ul>
            <li>Make sure to meet Seller in a public place, if seller stays Off campus, request he comes to it if possible. </li>
            <li>Make sure to check the item thoroughly before purchase</li>
            <li>If payment is via Mobile transfer, Seller should confirm receipt of payment to his account via his/her Bank's Mobile App or USSD before releasing item. </li>
            <li>If item is a Smartphone, Laptop, Gadget or Electronics, Buyer should test charging port, camera (if item is a mobile device), before purchase. </li>
            
          </ul>
        </div>

        <div className='seller--profile'>
          <h2>SELLER INFO:</h2>
          <div className='seller--info'>
            <div>
              <img src={avatar} alt="" />
              <h2>Dave Chapel Enterprise</h2>
              <div>
                <p><MdLocationOn /> Hostel: New Male 'A'</p>
              </div>
            </div>
            <div className='flex-col'>
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
              <p>Active Ads: 2</p>
            </div>
          </div>
        </div>

        <div className='product--spec'>
            <h3>Product Specification:</h3>
            <div>
              <p>Brand NEW:</p>
              <p>6GB RAM</p>
              <p>12GB ROM</p>
              <p>32MP Camera</p>
            </div>
        </div>

        <div>
          <h2>Reviews <FaArrowAltCircleRight /></h2>
        </div>
        <div className='more--from--seller flex-row'>
          <h2>Check out More from Seller</h2>
          <FaLongArrowAltRight />
        </div>
        <div className='more--from--category'>
          <h2>More from Smartphones Category:</h2>
          <div className='flex-row' style={{flexWrap: "wrap"}}>
            {fakeData.map((item, index) => {
              return <ProductCard 
                      image={item.image}
                      price={item.price}
                      name={item.name}
                      category={item.category}
                      />
            })}
          </div>

        </div>
        {showModal && <ConfirmationModal /> }
    </div>
  )
}
