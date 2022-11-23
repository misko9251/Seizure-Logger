import React, {useState} from 'react'
import {
    BrowserRouter as Router,
    Link,
    redirect,
    useNavigate
  } from "react-router-dom";
import { useAuth } from '../../context/authContext';
import {AiOutlineMenu} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'

function MobileNavbar() {

  //Create state to toggle mobile nav
  const [open, setOpen] = useState(false)

  const hamburger = <AiOutlineMenu fontSize='40px' 
  className='hamburger'
  onClick={()=> setOpen(!open)}
  />

  const closeHamburger = <AiOutlineClose fontSize='40px' 
  className='hamburger'
  onClick={()=> setOpen(!open)}
  />

  return (
    <nav className='mobileAuthNav'>
        {!open && hamburger}
        {open && closeHamburger}
     <h2 style={{color: 'black', fontWeight: '200', marginLeft: '10%'}}>Epilepsy Pups</h2>
    {open &&     
    
    <ul className="mobileUnorderedList">
        <li onClick={()=> setOpen(!open)}>
          <Link className="nav-link" style={{ textDecoration: 'none' }} to="/">HOME</Link>
        </li>
        <li onClick={()=> setOpen(!open)}>
            <Link className="nav-link" style={{ textDecoration: 'none' }} to="/about">OUR PURPOSE</Link>
        </li>
        <li onClick={()=> setOpen(!open)}>
            <Link className="nav-link" style={{ textDecoration: 'none' }} to="/login">LOGIN</Link>
        </li>
        <li onClick={()=> setOpen(!open)}>
            <Link className="nav-link register-btn" style={{ textDecoration: 'none' }} to="/register">REGISTER</Link>
        </li>
         
    </ul>}
</nav>
  )
}

export default MobileNavbar