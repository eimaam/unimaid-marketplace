import { collection, doc, getDoc, getDocs, onSnapshot, query, Timestamp, where } from 'firebase/firestore'
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
  const [activeUserAds, setActiveUserAds] = useState([])
  const [allUsernames, setAllUsernames] = useState([])

  const userData = {
    regEmail: userInfo.email,
    displayName: userInfo.displayName,
    username: userInfo.username,
    isVerified: userInfo.isVerified,
    phoneNo: userInfo.phoneNo,
    location: userInfo.location,
    staysHostel: userInfo.staysHostel,
    joinedOn: userInfo.joinedOn,
    totalAds: userAds.length,
    totalActiveAds: activeUserAds.length,
    totalSales: userInfo.totalSales,
    }
    
    const { regEmail, displayName, username, isVerified, phoneNo, location, staysHostel, joinedOn, totalAds, totalActiveAds, totalSales, adsList } = userData

    // fetching all usernames to use in signup or registration pages when registering user to check if username entered by user already exists
    const fetchAllUsernames = async () => {
      try{
        const q = query(collection(database, "usersDetails"))
        await onSnapshot(q, snapShot => {
          setAllUsernames(snapShot.docs.map(data => ({
            ...data.data()
          })))
          setLoading(false)
      })
      }
      catch(err){
        console.log(err.code)
      }
    }


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
          const q = query(adsRef, where("posterEmail", "==", user.email))
          await onSnapshot(q, snapShot => {
            setUserAds(snapShot.docs.map(data => ({
              ...data.data()
            })))
          })
      }
      catch(err){
          console.log(err.message)
      }
  }

    const fetchActiveUserAds = async () => {
      try{
          const q = query(adsRef, where("posterEmail", "==", user.email), where("isActive", "==", true))
          await onSnapshot(q, snapShot => {
            setActiveUserAds(snapShot.docs.map(data => ({
              ...data.data()
            })))
          })
      }
      catch(err){
          console.log(err.message)
      }
  }

  fetchUserInfo()
  fetchUserAds()
  fetchActiveUserAds()
  fetchAllUsernames()

  }, [user])

  const value = {
    userInfo,
    regEmail, displayName, isVerified, phoneNo, location, staysHostel, joinedOn, totalAds, username, totalActiveAds, totalSales,
    userAds,
    allUsernames,
  }

  return (
    <UserContext.Provider value={value}>
      { children }
    </UserContext.Provider>
  )
}
