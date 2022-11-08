import React, {useState, useContext} from 'react'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import { AuthContext } from '../../context/authContext';



function Navbar() {

    // Create state to see if we have a logged in user
    const { isAuthenticated, setAuth } = useContext(AuthContext)

      //Logout user
      async function logout(){
        try {
          const response = await fetch(
            '/users/logout'
          );
          const json = await response.json()
        //   setIsAuthenticated(false)
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
                  <Link className="nav-link" style={{ textDecoration: 'none' }} to="/about">OUR PURPOSE</Link>
              </li>
              {!isAuthenticated &&
                    <>
                        <li>
                            <Link className="nav-link" style={{ textDecoration: 'none' }} to="/login">LOGIN</Link>
                        </li>
                        <li>
                            <Link className="nav-link register-btn" style={{ textDecoration: 'none' }} to="/register">REGISTER</Link>
                        </li>
                    </>
                }
              {isAuthenticated &&
                <>
                        <li>
                            <Link className="nav-link" style={{ textDecoration: 'none' }} to="/posts">POSTS</Link>
                        </li>
                        <li>
                            <Link onClick={logout} className="nav-link register-btn" style={{ textDecoration: 'none' }}>LOG OUT</Link>
                        </li>
                </>
            }
          </ul>
      </nav>
  )
}

export default Navbar