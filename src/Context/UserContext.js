import { collection, getDocs, onSnapshot, query, Timestamp, where } from 'firebase/firestore'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { database } from '../firebaseConfig'
import { useAuth } from './AuthContext'

const UserContext = createContext()

export const useUser = () => {
  return useContext(UserContext)
}

export const UserProvider = ({children}) => {
  const { user, loading, setLoading, userRef, adsRef } = useAuth()
  const [userInfo, setUserInfo] = useState([])
  const [userAds, setUserAds] = useState([])

  const userData = {
    regEmail: userInfo.email,
    displayName: userInfo.displayName,
    isVerified: userInfo.isVerified,
    phoneNo: userInfo.phoneNo,
    location: userInfo.location,
    staysHostel: userInfo.staysHostel,
    joinedOn: userInfo.joinedOn,
    totalAds: userAds.length,
    }

    
    const { regEmail, displayName, isVerified, phoneNo, location, staysHostel, joinedOn, totalAds, adsList } = userData
    

  useEffect(() => {
    setLoading(true)
    const fetchUserInfo = async () => {
      try{
        const q = query(userRef, where("email", "==", user.email))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          setUserInfo(doc.data());
        });
      }
      catch(err){
        console.log(err.message)
      }
    }

    const fetchUserAds = async () => {
      try{
          const q = query(adsRef, where("poster", "==", "imamddahir@gmail.com"))
          await onSnapshot(q, snapShot => {
            setUserAds(snapShot.docs.map(data => ({
              ...data.data()
            })))
          })
          setLoading(false)
      }
      catch(err){
          console.log(err.message)
      }
  }

    fetchUserInfo()
    fetchUserAds()

  }, [user])

  // generating personal date format DD/MM/YY
    const stamp = Timestamp.now().toDate()
    
    let time = stamp.getTime()
    let day = stamp.getDate()
    let monthByIndex = stamp.getMonth();
    let fullYear = stamp.getFullYear();
    let month = monthByIndex+1;
    // add 0 to beginning of Month 1-9
    if(month <= 9){
        month = `0${month}`
    }
    // convert year to string to easily extract only last two figures eg. 2022 == 22
    const year = fullYear.toString().slice(2,4)

    // final date format DD/MM/YY
    const date = `${day}/${month}/${year}`
    // creating date format with no / to create a link
    const plainDate = `${day}${month}${year}`

  

  const value = {
    userInfo,
    regEmail, displayName, isVerified, phoneNo, location, staysHostel, joinedOn, totalAds,
    userAds,
    plainDate,
    time,
  }

  return (
    <UserContext.Provider value={value}>
      { children }
    </UserContext.Provider>
  )
}
