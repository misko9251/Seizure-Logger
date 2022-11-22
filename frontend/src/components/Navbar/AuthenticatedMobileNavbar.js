import React, {useState} from 'react'
import {
    BrowserRouter as Router,
    Link,
    redirect,
    useNavigate
  } from "react-router-dom";
import { useAuth } from '../../context/authContext';
import {TiThMenuOutline} from 'react-icons/ti'
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
    
  const hamburger = <TiThMenuOutline fontSize='40px' 
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
    {open &&
    <ul className='mobileUnorderedList'>
        <li>
          <Link className="nav-link" style={{ textDecoration: 'none' }} to="/">HOME</Link>
        </li>
        <li>
            <Link className="nav-link" style={{ textDecoration: 'none' }} to="/ourpurpose">OUR PURPOSE</Link>
        </li>
        <li>
            <Link className="nav-link" style={{ textDecoration: 'none' }} to="/dashboard">DASHBOARD</Link>
        </li>
        <li>
            <Link onClick={logout} className="nav-link logout-btn" style={{ textDecoration: 'none' }}>LOG OUT</Link>
        </li>            
    </ul>}
</nav>
  )
}

export default AuthenticatedMobileNavbar