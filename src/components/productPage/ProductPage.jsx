import React, { useEffect, useState } from 'react'
import { SellerCard } from "./SellerCard"
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { Modal } from '../Modal'
import { useAuth } from '../../Context/AuthContext'
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
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
  // parameter for grabbing url and creating dynamic url from react-router
  let { url } = useParams()

  const { adsRef, navigate } = useAuth()
  const { username, totalActiveAds } = useUser()

  const [showModal, setShowModal] = useState(false)
  // state to hold mainImage setting
  const [mainItemImage, setMainItemImage] = useState("")
  const [item, setItem] = useState([])
  const [seller, setSeller] = useState({})


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
        // set main Item image or header image here to allow image load complete from fetchAd before settting here to avoid undefined 
        setMainItemImage(item[0].itemImages[0])
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
      // check if status of item from url is active or not
      // if inactive go to error page
  }else if(item[0].isActive === false){
    return navigate('error')
  }


  const data = {
    posterEmail: item[0].posterEmail,
    sellerDisplayName: seller.displayName,
    sellerUsername: seller.username,
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
    itemStatus: item[0].isActive,
    id: item[0].id
  }

  const {posterEmail, sellerDisplayName, sellerUsername, sellerPhoneNo,
    sellerLocation, category, itemName, itemPrice, itemBrand, itemCondition, itemColour, 
        itemManufacturingYear, itemPurchaseYear, itemReceipt, itemDetails, itemImages, itemStatus, isSponsored, id} = data

    // function to update Ad status or Ad delete
  const handleClick = async () => {
    try{
      await updateDoc(doc(adsRef, id), {
        isActive: false
      })
      setShowModal(false)
      toast.success('Ad Status set to Inactive')
      return navigate(`${username}`)
    }
    catch(err){
      console.log(err.message)
    }
  }

  // change head image to display others
  const changeMainImage = (image) => {
    setMainItemImage(image)
  }
      
  return (
    <div className='product--page'>
      <div className='product--images'>
        <div className='main--image--container'>
          <img src={mainItemImage} alt="" className='main'/>
        </div>
        {item[0].itemImages.length > 1 &&
          <div className='more--images--container'>
            {itemImages.map((item, index) => {
              return <img key={index} src={item} alt={item[0].name} onClick={() => changeMainImage(itemImages[index])}/>
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
        status={itemStatus}
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
        profileLink={sellerUsername}
        numberOfActiveAds={totalActiveAds}
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
