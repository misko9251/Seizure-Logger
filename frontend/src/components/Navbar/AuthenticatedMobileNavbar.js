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

function AuthenticatedMobileNavbar() {

    //Create state to toggle mobile nav
    const [open, setOpen] = useState(false)

    // Create state to see if we have a logged in user
    const {auth, setAuth} = useAuth()

    // Navigate after successful logout
    const navigate = useNavigate();

  // Redirect functions
      function redirect(){
        navigate('/')
      }

      //Logout user
      async function logout(){
        try {
          const response = await fetch(
            '/users/logout'
          );
          const json = await response.json()
          setAuth(false)
          localStorage.clear();
          redirect()
        } catch (error) {
          console.log(error)
        }
      }
    
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
    <ul className='mobileUnorderedList'>
        <li onClick={()=> setOpen(false)}>
          <Link className="nav-link" style={{ textDecoration: 'none' }} to="/">HOME</Link>
        </li>
        <li onClick={()=> setOpen(false)}>
            <Link className="nav-link" style={{ textDecoration: 'none' }} to="/ourpurpose">OUR PURPOSE</Link>
        </li>
        <li onClick={()=> setOpen(false)}>
            <Link className="nav-link" style={{ textDecoration: 'none' }} to="/dashboard">DASHBOARD</Link>
        </li>
        <li onClick={()=> setOpen(false)}>
            <Link onClick={logout} className="nav-link logout-btn" style={{ textDecoration: 'none' }}>LOG OUT</Link>
        </li>            
    </ul>}
</nav>
  )
}

export default AuthenticatedMobileNavbar