import React, { useEffect, useState } from 'react'
import { ProductCard } from "../ProductCard"
import { SellerCard, sellerCard } from "./SellerCard"
import phone1 from "../../assets/smartphone1.png"
import phone2 from "../../assets/smartphone2.jpg"
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { fakeData } from '../FakeData'
import { Modal } from '../Modal'
import { useAuth } from '../../Context/AuthContext'
import { collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { MoonLoader } from 'react-spinners'
import { useParams } from 'react-router-dom'
import { useUser } from '../../Context/UserContext'
import { database } from '../../firebaseConfig'
import { ItemSpec } from './ItemSpec'
import { MoreCategoryItems } from './MoreCategoryItems'
import { ItemStats } from './ItemStats'
import { SafetyMeasures } from './SafetyMeasures'
import { ItemMainDetails } from './ItemMainDetails'
import { toast } from 'react-toastify'

export const ProductPage = () => {
  const { user, userRef, adsRef, loading, setLoading, navigate } = useAuth()
  const { username } = useUser()
  const [showModal, setShowModal] = useState(false)
  const [item, setItem] = useState([])
  const [seller, setSeller] = useState({})

  
  let { url } = useParams()
  
  console.log(encodeURI(url))


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
  }else if(item[0].isActive === false){
    return navigate('error')
  }


  const data = {
    posterEmail: item[0].posterEmail,
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

    // function to update Ad status or Ad delete
  const handleClick = async () => {
    try{
      await updateDoc(doc(adsRef, id), {
        isActive: false
      })
      toast.success('Ad Status set to Inactive')
    }
    catch(err){
      console.log(err.message)
    }
  }
      

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

        {/* item price, condition, colour and more */}
        <ItemMainDetails 
        itemName={itemName}
        price={itemPrice}
        posterEmail={posterEmail}
        handleClick={setShowModal}
        />

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
        {showModal 
        && 
        <Modal handleClick={handleClick}>
          <h3>You're about to Close an Ad. </h3>
          <h3>Pls respond to this.. </h3>
          <h4>Item has been sold?</h4>
        </Modal> 
        }
    </div>
  )
}
