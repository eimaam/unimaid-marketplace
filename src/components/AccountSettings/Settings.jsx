import React, { useState } from 'react'
import { FaBars, FaUser } from 'react-icons/fa'
import { MdPermContactCalendar } from 'react-icons/md'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { RiUserSettingsFill } from 'react-icons/ri'
import { AccountSettings } from './AccountSettings'
import { ContactSettings } from './ContactSettings'
import { ProfileSettings } from './ProfileSettings'
import { useParams } from 'react-router-dom'
import { useUser } from '../../Context/UserContext'
import { useAuth } from '../../Context/AuthContext'

export const Settings = () => {
    const { user } = useAuth()
    const { displayName, username, phoneNo } = useUser()
    const [nav, setNav] = useState("profile")
    const [selected, setSelected] = useState("")

    const toggle = () => {
        let menu = document.querySelector('.options')
        menu.style.display = "block";
    }

    const handleNavSelection = (option) => {
        let menu = document.querySelector('.options')
        setNav(option)
        menu.style.display = "none"
    }

  return (
    <div id='settings'>
        <div className='toggler' onClick={toggle}>
            <h2><HiOutlineMenuAlt1 /></h2>
        </div>
        <ul className='options'>
            <li onClick={() => handleNavSelection("profile")}><FaUser /> Profile Settings</li>
            <li onClick={() => handleNavSelection("contact")}><MdPermContactCalendar /> Contact Details</li>
            <li onClick={() => handleNavSelection("account")}><RiUserSettingsFill /> Account Settings</li>
        </ul>
        {
            nav === "profile"
            && 
            <ProfileSettings
            name={displayName}
            option={selected} setOption={setSelected}/>
        }
        {
            nav === "contact"
            && 
            <ContactSettings 
            phoneNo={phoneNo}
            email={user.email}
            option={selected} setOption={setSelected}/>
        }
        {
            nav === "account"
            && 
            <AccountSettings option={selected} setOption={setSelected}/>
        }
        
    </div>
  )
}
