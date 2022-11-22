import React from 'react'
import {
    BrowserRouter as Router,
    Link,
    redirect,
    useNavigate
  } from "react-router-dom";
import { useAuth } from '../../context/authContext';
import {TiThMenuOutline} from 'react-icons/ti'

function AuthenticatedMobileNavbar() {

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

  return (
    <nav className='mobileAuthNav'>
        <TiThMenuOutline fontSize='50px' className='hamburger'/>
    <ul>
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
    </ul>
</nav>
  )
}

export default AuthenticatedMobileNavbar