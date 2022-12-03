import React, { useEffect, useState } from 'react'
import { ProductCard } from '../ProductCard'
import { fakeData } from '../FakeData'
import { useData } from '../../Context/DataContext'
import { LoaderFullscreen } from '../LoaderFullscreen'
import { useAuth } from '../../Context/AuthContext'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { database } from '../../firebaseConfig'

export const ProductsSection = () => {
  // const { loading, setLoading } = useAuth()
  
  // all ads state manager
  const [allAds, setAllAds] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchAllAds = async () => {
    try{
      const q = query(collection(database, "Ads"))
      await onSnapshot(q, snapShot => {
        setAllAds(snapShot.docs.map(data => ({
          ...data.data()
        })))
      })
      setLoading(false)
    }
    catch(err){
      console.log(err.message)
    }
  }
  fetchAllAds()
}, [])


if(allAds.length === undefined){
  return <LoaderFullscreen />
}





  return (
    <section>
      <div className='section--title'>
        <h2>
          NEW ADS:
        </h2>
      </div>
      <div className='products'>
        {allAds.map((item, index) => {
          return <ProductCard
                  key={index}
                  image={item.itemImages}
                  name={item.itemName}
                  price={item.itemPrice}
                  id={item.id}
                  category={item.category}
                  />
            }) 
        }
      </div>
    </section>
  )
}
