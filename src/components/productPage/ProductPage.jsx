import React, { useEffect, useState } from 'react'
import { ProductCard } from "../ProductCard"
import { SellerCard, sellerCard } from "./SellerCard"
import phone1 from "../../assets/smartphone1.png"
import phone2 from "../../assets/smartphone2.jpg"
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { fakeData } from '../FakeData'
import { ConfirmationModal } from '../ConfirmationModal'
import { useAuth } from '../../Context/AuthContext'
import { collection, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { MoonLoader } from 'react-spinners'
import { useParams } from 'react-router-dom'
import { useUser } from '../../Context/UserContext'
import { database } from '../../firebaseConfig'
import { ItemSpec } from './ItemSpec'
import { MoreCategoryItems } from './MoreCategoryItems'
import { ItemStats } from './ItemStats'
import { SafetyMeasures } from './SafetyMeasures'

export const ProductPage = () => {
  const { userRef, adsRef, loading, setLoading } = useAuth()
  const { username } = useUser()
  const [showModal, setShowModal] = useState(false)
  const [item, setItem] = useState([])
  const [seller, setSeller] = useState({})

  
  
  let { url } = useParams()


  useEffect(() => {
    const fetchAd = async () => {
      try{
        const q = query(adsRef, where("id", "==", encodeURI(url)))
        await onSnapshot(q, snapShot => {
          setItem(snapShot.docs.map(data => ({
            ...data.data()
          })))
        })
      }
      catch(err){
        console.log(err)
      }
    }
    fetchAd()
  }, [])

  
  useEffect(() => {
    const fetchSeller = async () => {
      try{
        const q = query(collection(database, "usersDetails"), where("email", "==", `${item[0].posterEmail}`))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc => {
          setSeller(doc.data())
        })
      }
      catch(err){
        console.log(err)
      }
    }
    fetchSeller()
  }, [item])



  // display loading animation if data is not ready
  if(item.length === 0 || seller.length === 0 ){
    return <div className='container'>
              <div className='container--item'>
                <MoonLoader />
              </div>
            </div>
  }


  const data = {
    poster: item[0].posterEmail,
    sellerDisplayName: seller.displayName,
    sellerPhoneNo: seller.phoneNo,
    sellerLocation: seller.location,
    category: item[0].category,
    itemName: item[0].itemName,
    itemPrice: item[0].itemPrice,
    itemBrand: item[0].itemBrand,
    itemCondition: item[0].itemCondition,
    itemColour: item[0].itemColour,
    itemManufacturingYear: item[0].itemManufacturingYear,
    itemPurchaseYear: item[0].itemPurchaseYear,
    itemReceipt: item[0].receipt,
    itemDetails: item[0].itemDetails,
    itemImages: item[0].itemImages,
    isSponsored: item[0].isSponsored,
    id: item[0].id
  }

  const {posterEmail, sellerDisplayName, sellerPhoneNo,
    sellerLocation, category, itemName, itemPrice, itemBrand, itemCondition, itemColour, 
        itemManufacturingYear, itemPurchaseYear, itemReceipt, itemDetails, itemImages, isSponsored, id} = data


      

  return (
    <div className='product--page'>
      <div className='product--images'>
        <div className='main--image--container'>
          <img src={itemImages[0]} alt="" className='main'/>
        </div>
        {item[0].itemImages.length > 1 &&
          <div className='more--images--container'>
            {itemImages.map((item, index) => {
              return <img key={index} src={item} alt={item[0].name} />
            })}
          </div>
        }
        </div>

        <div className='product--info'>
          <h2>{itemName}</h2>
          <h2>{`₦ ${itemPrice}`}</h2>
        </div>
            {/* close Ad button */}
        <div>
          <button className='error--background' onClick={() => setShowModal(prev => !prev)}>Close Ad</button>
        </div>

        {/* Item stas */}
        <ItemStats 
        condition={itemCondition}
        colour={itemColour}
        manufactureYear={itemManufacturingYear}
        brand={itemBrand}
        receipt={itemReceipt}
        purchaseYear={itemPurchaseYear}
        />
        
        {/* ---------safety measures--------- */}
        <SafetyMeasures />

        {/* ---------seller profile details--------- */}
        <SellerCard 
        displayName={sellerDisplayName}
        phoneNo={sellerPhoneNo}
        location={sellerLocation}
        />

        {/* product specifications */}
        <ItemSpec 
        itemDetails={itemDetails}
        />

        <div>
          <h2>Reviews <FaArrowAltCircleRight /></h2>
        </div>

        {/* more items from same category */}
        <MoreCategoryItems category={category}/>
        {showModal && <ConfirmationModal /> }
    </div>
  )
}
