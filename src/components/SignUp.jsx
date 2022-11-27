import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CgGoogle } from "react-icons/cg"
import { useAuth } from '../Context/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, onSnapshot, query, serverTimestamp, setDoc, Timestamp, where } from 'firebase/firestore'
import { toast } from "react-toastify"
import { auth, database } from '../firebaseConfig'
import { useUser } from '../Context/UserContext'

export const SignUp = () => {
    const { loading, setLoading, user, setUser, isLogged, setIsLogged, navigate, logInWithGoogle, userRef, setError, error } = useAuth()
    const { plainDate, time } = useUser()

    const [showMoreInputs, setShowMoreInputs] = useState(false)
    const [existingUsername, setExistingUsername] = useState([])

    useEffect(() => {
        error !== "" &&
        setTimeout(() => {
            setError("")
        }, 2500);
    }, [error])

    const [data, setData] = useState({
        email: "",
        password: "",
        displayName: "",
        phoneNo: "",
        username: "",
        staysHostel: "",
        location: "",
    })

    
    const {email, password, displayName, phoneNo, username, staysHostel, location} = data
    
    
    // creating unique id for users
    // DATE: creating date format Day/Month
    // random number between 0 to 4 to use
    const random = Math.floor(Math.random() * 5-1 + 1)*1
	
    // seller unique id
	const id = displayName.replaceAll(' ','').toLowerCase()+plainDate.slice(0, random+2)+time.toString().slice(0, random)

    console.log(id)

    // handle input change
    const handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setData(prevData => ({
            ...prevData,
            [name]:value
        }))
        console.log(data)
    }

    // get list of usernames from database that matches one entered by new user on sign up and save to regUsernames state 
useEffect(() => {
    const checkUsername = async () => {
      try{
        const q = query(collection(database, "userDetails"), where("username", "==", username))
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
    checkUsername()
  }, [username])
  
  // check if the username entered by new user matches another in the database
  // if regUsernames' length is greater than 0 that means username entered matches one from the database and save the value into taken username
  const registeredUsername = existingUsername.length > 0 && existingUsername[0].username
  
  // regular expression for USERNAME to use in testing if username corresponds to the expression
  const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{2,16}$/;

  console.log(existingUsername)
  console.log(usernameRegex.test(username))


    // handle signup
    const signUp = async (e) => {
        e.preventDefault()
        if(password.length < 6){
            setLoading(false)
            setError('Password must be at least 6 characters long')
            return toast.error('Password must be at least 6 characters long')
        }else if(username.length < 3){
            // check if entered username is up to 3 characters
            setError('Username must be at least 3 characters long')
            return toast.error('Username must be at least 3 characters long')
            // test for username format using regex above
        }else if(!usernameRegex.test(data.username)){
        setError('Incorrect Username format.  Not supporting Username that starts with a number and can\'t end with \'.\'')
        return toast.error('Username format not supported')
        }
        
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                setUser({
                    email: email,
                    displayName: displayName,
                })
                setDoc(doc(userRef, email), {
                    email: email,
                    displayName: displayName,
                    username: username,
                    location: location,
                    phoneNo: phoneNo,
                    staysHostel: staysHostel,
                    isVerified: false,
                    accountStatus: "active", /*{ account status set to active and once user deletes account it gets updated to inactive/delete from settings page in order to keep track of deleted accounts}*/
                    joinedOn: serverTimestamp(),
                    totalAdsCreated: 0,
                    totalSales: 0,
                    activeAds: 0,
                })
                setLoading(false)
                toast.success('Signed up successfully...')
                return navigate('/')
            })
        }
        catch(err){
            if(err.code === 'auth/wrong-password'){
                toast.error('Wrong Password')
                setError('Wrong Password')
              }else if(err.code === 'auth/too-many-requests'){
                toast.error('Too many trials! You will have to reset your password to access this site!')
                setError('Too many trials! You will have to reset your password to access this site!')
              }else if(err.code === 'auth/user-not-found'){
              }else if(err.code === 'auth/email-already-in-use'){
                toast.error('Email already in use!')
                setError('Email already in use')
              }else if(err.code === 'auth/user-not-found'){
                toast.error('User not found!')
                setError('User not found!')
              }else if(err.code === 'auth/network-request-failed'){
                setError('Sorry...! Something went wrong. Check your internet connection')
              }
              else{
                setLoading(false)
                console.log(err.message)
              }
        }
    }


  return (
    <div className='container' id='signup'>
        <form onSubmit={signUp}>
            <h3>Hi there! 👋 Welcome!</h3>
            <h4>Enter your details to register your business/brand:</h4>
            {
            !showMoreInputs &&
            <>
            <div>
                <input 
                type="email"
                name='email' 
                placeholder='Email Address'
                value={email}
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
                minLength={11}
                maxLength={11}
                />
            </div>
            <div>
                <input 
                type="text"
                name='displayName' 
                placeholder='Full Name/Business Name'
                value={displayName}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <input 
                type="password" 
                placeholder='Password'
                name='password'
                value={password}
                onChange={handleChange}
                required
                />
            </div>
            <button type='button' onClick={() => setShowMoreInputs(prevState => !prevState)}>Continue</button>
            </>
            }

            {showMoreInputs &&
            <>
                <label style={{display: "block", marginRight: "auto", marginLeft: "30px", fontStyle: "italic", fontWeight: "bold", padding: "0", marginBlock: "0" }} htmlFor="">
                    {username ? `www.maidmarketplace/${username}` : "eg: www.maidmarketplace/iphonestore1"}
                </label>
            <div>
                <input 
                type="text" 
                name='username'
                value={username}
                placeholder='Username'
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <select name='staysHostel' defaultValue="Do you stay in Hostel?" onChange={handleChange}>
                    <option defaultValue="" disabled>Do you stay in Hostel?</option>
                    <option value="yes">YES</option>
                    <option value="no">NO</option>
                </select>
            </div>
            <i>If your answer to the above question is YES, enter your Hostel name 
                else enter the name of your area of residence here in Maiduguri.
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
            </>
            }
            {
            showMoreInputs &&
            <>
            <div>
                <button onClick={() => setShowMoreInputs(prevState => !prevState)}>Previous</button>
            </div>
            <div>
                <input type='submit' value="Sign up" />
            </div>
            </>
            }
            <div>
                <p className='error'>{error}</p>
            </div>
            <p>or</p>
            <div>
                <button className='flex-row' style={{margin: "auto"}} onClick={logInWithGoogle}>
                    <CgGoogle /> Sign up with Google 
                </button>
            </div>
            <div>
                <p>Have an account already? <button className='btn--small'><Link to="/login">Login</Link></button></p>
            </div>
        </form>
    </div>
  )
}
