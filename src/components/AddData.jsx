import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import { toast } from 'react-toastify'
import { useData } from '../Context/DataContext'
import { useUser } from '../Context/UserContext'

export const AddData = () => {
    const { loading, setLoading, user, setUser, isLogged, setIsLogged, navigate, logInWithGoogle, userRef, setError, error } = useAuth()
    const { userInfo } = useUser()

    const { checkUsername, existingUsername } = useData()

    // when logged in with google, check if user has a username
    // if username is available, User is not newly registered so navigate to homepage
    useEffect(() => {
        userInfo.username ? navigate('/') : setLoading(false)
    }, [user])

    const [data, setData] = useState({
        displayName: "",
        username: "",
        phoneNo: "",
        staysHostel: "",
        location: "",
    })

    const {displayName, username, phoneNo, staysHostel, location} = data

    // handle input change
    const handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setData(prevData => ({
            ...prevData,
            [name]:value
        }))
    }


    useEffect(() => {
        checkUsername(username)
    }, [username])

    // regular expression for USERNAME to use in testing if username corresponds to the expression
    const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{2,16}$/;

    // handle profile update
    const AddData = async (e) => {
        e.preventDefault()
        // if existingUsername.length > 0 that means username already exists, return error message
        if(existingUsername.length > 0){
            setError('Username already taken')
            return toast.error('Username already taken')
        }else if(username.length < 3){
            // check if entered username is up to 3 characters
            setError('Username must be at least 3 characters long')
            return toast.error('Username must be at least 3 characters long')
            // return error if username entered == "error" as site/error is reserved for error page
        }else if(username == "error"){
            setError('Ooops! You can\'t use that Username as it is a reserved word on the here!')
            return toast.error('Ooops! You can\'t use that Username as it is a reserved word on the here!')
            // test for username format using regex above
        }else if(!usernameRegex.test(data.username)){
            setError('Incorrect Username format.  Not supporting Username that starts with a number and can\'t end with \'.\'')
            return toast.error('Username format not supported')
        }
        try{
            await updateDoc(doc(userRef, user.email), {
                displayName: displayName,
                username: username,
                location: location,
                phoneNo: phoneNo,
                staysHostel: staysHostel,
                isVerified: false,
                joinedOn: serverTimestamp()
            })
            toast.success("Profile Updated")
            return navigate('/')
        }
        catch(error){
            console.log(error.message)
        }

    }

  return (
    <div className='container' id='createAds'>
        <form onSubmit={AddData} className='container--item' style={{border: "none"}}>
            <h3>Fill the below to complete setting up your account </h3>
            <div>
                <input 
                type="text"
                name='displayName' 
                placeholder='Full Name/Brand/Business Name'
                value={displayName}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <input 
                type="number" 
                name='phoneNo'
                placeholder='Phone Number - preferrably WA number'
                pattern='08012345678 - without country code'
                value={phoneNo}
                onChange={handleChange}
                />
            </div>
            <div>
                <input 
                type="text" 
                name='username'
                placeholder='Username'
                value={username}
                onChange={handleChange}
                />
            </div>
            <div>
                <select name='staysHostel' defaultValue="Do you stay in Hostel?" onChange={handleChange}>
                    <option defaultValue="" disabled>Do you stay in Hostel?</option>
                    <option value="yes">YES</option>
                    <option value="no">NO</option>
                </select>
            </div>
            <i>
                If your answer to the above question is YES, enter your Hostel name 
                else enter area of residence or Store Location here in Maiduguri.
            </i>
            <div>
                <input 
                type="text" 
                name='location'
                value={location}
                placeholder='Area/Hostel Name or Store Location'
                onChange={handleChange}
                required
                />
            </div>
            {/* error message */}
            <i className='error'>{error}</i>
            <div>
                <input type='submit' value="Submit" />
            </div>
        </form>
    </div>
  )
}
