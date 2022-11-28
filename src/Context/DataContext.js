import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import { database } from '../firebaseConfig'
import { useAuth } from './AuthContext'

const DataContext = createContext()

export const useData = () => {
    return useContext(DataContext)
}

export const DataProvider = ({ children }) => {
    const [existingUsername, setExistingUsername] = useState([])

    // get list of usernames from database that matches one entered by new user on sign up and save to regUsernames state 
    const checkUsername = async (valueToCheck) => {
      try{
        const q = query(collection(database, "usersDetails"), where("username", "==", valueToCheck))
        await onSnapshot(q,snapShot => {
          setExistingUsername(snapShot.docs.map(data => ({
            ...data.data(),
            id: data.id
          })))
        })
      }
      catch(err){
        console.log(err.message)
      }
    }

    console.log(existingUsername)

    const value = {
        checkUsername,
        existingUsername,
    }



  return (
    <DataContext.Provider value={value}>
        { children }
    </DataContext.Provider>
  )
}
