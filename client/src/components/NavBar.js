import React from 'react'
import { FaCat } from 'react-icons/fa'

const NavBar = () => {
  return (
    <nav className='navbar'>
        <h1 className='login-logo'>
            <FaCat/>
            AnotaCat
        </h1>
    </nav>
  )
}

export default NavBar