import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoChatbubble } from "react-icons/io5";


const Navbar = () => {
  return (
    <div>

      <div>
        <IoChatbubble color='' className='bg-(--Primary)'/>
        <h2>Socilify</h2>
      </div>

      <div>
        <NavLink>HOME</NavLink>
        <NavLink>Friends</NavLink>
        <NavLink>Search</NavLink>
        <button>Notification</button>
        <NavLink>Account</NavLink>
      </div>
    </div>
  )
}

export default Navbar