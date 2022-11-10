import React, {useState, useContext} from 'react'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import { useAuth } from '../../context/authContext';



function Navbar() {
    // Create state to see if we have a logged in user
    const {setAuth, user} = useAuth()
      //Logout user
      async function logout(){
        try {
          const response = await fetch(
            '/users/logout'
          );
          const json = await response.json()
          setAuth(false)
          localStorage.clear();
        } catch (error) {
          console.log(error)
        }
      }

  return (
      <nav className='navBar'>
          <ul>
              <li>
                <Link className="nav-link" style={{ textDecoration: 'none' }} to="/">HOME</Link>
              </li>
              <li>
                  <Link className="nav-link" style={{ textDecoration: 'none' }} to="/ourpurpose">OUR PURPOSE</Link>
              </li>
              <li>
                  <Link className="nav-link" style={{ textDecoration: 'none' }} to="/posts">POSTS</Link>
              </li>
              <li>
                  <Link onClick={logout} className="nav-link register-btn" style={{ textDecoration: 'none' }}>LOG OUT</Link>
              </li>            
          </ul>
      </nav>
  )
}

export default Navbar