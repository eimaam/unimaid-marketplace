import { browserLocalPersistence, onAuthStateChanged, setPersistence, signInWithPopup, signOut } from 'firebase/auth'
import { doc, setDoc, getDoc, collection, query, onSnapshot } from 'firebase/firestore'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, database, googleProvider } from '../firebaseConfig'
import { toast } from "react-toastify"
const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const userRef = collection(database, "usersDetails")
    const adsRef = collection(database, "Ads")


    const [user, setUser] = useState(null)
    const [allAds, setAllAds] = useState([])
    const [isLogged, setIsLogged] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")



    // fetch user data on every login
    useEffect(() => {
        setLoading(true)
        const fetchUserData = async () => {
            setUser(null)
            onAuthStateChanged(auth, async data => {
                if(data){
                    setIsLogged(true)
                    try{
                        const document = await getDoc(doc(userRef, data.email))
                        if(!document.exists()){
                            await setDoc(doc(userRef, data.email), {
                                email: data.email,
                                displayPhoto: data.photoURL,
                                name: data.displayName
                            })
                        }
                        setUser(data)
                    }
                    catch(error){
                        console.log(error.message)
                    }
                }

            })
        }

        const fetchAllAds = async () => {
            try{
              const q = query(collection(database, "Ads"))
              await onSnapshot(q, snapShot => {
                setAllAds(snapShot.docs.map(data => ({
                  ...data.data()
                })))
              })
            }
            catch(err){
              console.log(err.message)
            }
          }

        fetchUserData()
        fetchAllAds()
    }, [])

    // log in with gmail
    const logInWithGoogle = async () => {
        try{
            await setPersistence(auth, browserLocalPersistence)
            await signInWithPopup(auth, googleProvider)
            .then(res => {
                setUser({
                    email: res.email,
                    displayPhoto: res.photoURL,
                    displayName: res.displayName
                })
                setLoading(true)
                navigate('/complete-profile')
        })
        }
        catch(error){
            console.log(error.message)
        }
    }

    // logout function
    const logOut = () => {
        setIsLogged(false)
        setUser(null)
        signOut(auth)
        .then(() => {
            localStorage.clear();
            toast.info('Logged Out Successfully...')
        })
        return navigate('/login')
    }


    // export values to be used in other components
    const value = {
        logInWithGoogle,
        user,
        setUser,
        loading, 
        setLoading, 
        isLogged,
        setIsLogged,
        navigate,
        error,
        setError,
        userRef,
        logOut,
        adsRef,
        message, setMessage
    }





  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
