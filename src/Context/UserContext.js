import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from './AuthContext'

const UserContext = createContext()

export const useUser = () => {
  return useContext(UserContext)
}

export const UserProvider = ({children}) => {
  const { user, loading, setLoading, usersRef } = useAuth()
  const [userInfo, setUserInfo] = useState({})


  useEffect(() => {
    const fetchUserInfo = async () => {
      try{
        const q = query(usersRef, where("email", "==", user.email))
        await onSnapshot(q, snapShot => {
          setUserInfo(snapShot.docs.map(data => ({
            ...data.data()
          }))
          )
          setLoading(false)
        })
      }
      catch(err){
        console.log(err.message)
      }
    }

    fetchUserInfo()
  }, [user])

  console.log(userInfo)




  const value = {
    userInfo
  }

  return (
    <UserContext.Provider value={value}>
      { children }
    </UserContext.Provider>
  )
}
