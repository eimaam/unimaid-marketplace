import { browserLocalPersistence, onAuthStateChanged, setPersistence, signInWithPopup, signOut } from 'firebase/auth'
import { doc, setDoc, getDoc, collection } from 'firebase/firestore'
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
    const [isLogged, setIsLogged] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")



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
        fetchUserData()
    }, [])

    // log in with gmail
    const loginWithGoogle = async () => {
        try{
            await setPersistence(auth, browserLocalPersistence)
            await signInWithPopup(auth, googleProvider)
            .then(res => {
                setUser({
                    email: res.email,
                    displayPhoto: res.photoURL,
                    displayName: res.displayName
                })
            navigate('/profile')
        })
        }
        catch(error){
            console.log(error.message)
        }
    }

    // logout function
    const logOut = () => {
        setIsLogged(false)
        signOut(auth)
        .then(() => {
            setUser(null)
            localStorage.clear();
            toast.info('Logged Out Successfully...')
        })
        return navigate('/login')
    }


    // export values to be used in other components
    const value = {
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
        adsRef
    }





  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
