import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import React, { Children, createContext, useContext, useEffect } from 'react'
import { database } from '../firebaseConfig'
import { useAuth } from './AuthContext'

const DataContext = createContext()

export const useData = () => {
    return useContext(DataContext)
}

export const DataProvider = ({ children }) => {
    const adsRef = collection(database, "Ads")
    const {loading, setLoading} = useAuth()

    useEffect(() => {
        const fetchCollection = async () => {
            setLoading(true)
            try{
                const q = query(adsRef, where("poster", "==", "imamddahir@gmail.com"))
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach((doc) => {
                    console.log(doc.data())
                })
                setLoading(false)
            }
            catch(err){
                console.log(err.message)
            }
        }

        fetchCollection()
    }, [])



  return (
    <DataContext.Provider >
        { children }
    </DataContext.Provider>
  )
}
