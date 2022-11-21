import { collection, onSnapshot, where } from 'firebase/firestore'
import React, { Children, createContext, useContext } from 'react'
import { database } from '../firebaseConfig'

const DataContext = createContext()

export const useData = () => {
    return useContext(DataContext)
}

export const DataProvider = ({ children }) => {
    const adsRef = collection(database, "Ads")

    const fetchCollection = async () => {
        setLoading(true)
        try{
            const q = query(adsRef, where("poster", "==", "imamddahir@gmail.com"))
            await onSnapshot(q, snapShot => {
                console.log(snapShot.docs.map(data => ({
                    ...data.data()
                })))
            })
            setLoading(false)
        }
        catch(err){
            console.log(err.message)
        }
    }



    const value = {
        fetchCollection
    }

  return (
    <DataContext.Provider value={value}>
        { children }
    </DataContext.Provider>
  )
}
