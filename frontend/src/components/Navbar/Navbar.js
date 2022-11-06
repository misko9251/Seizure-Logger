import React from 'react'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";



function Navbar() {
  return (
      <nav className='navBar'>
          <ul>
              <li>
                <Link className="nav-link" style={{ textDecoration: 'none' }} to="/">HOME</Link>
              </li>
              <li>
                  <Link className="nav-link" style={{ textDecoration: 'none' }} to="/about">OUR PURPOSE</Link>
              </li>
              <li>
                  <Link className="nav-link" style={{ textDecoration: 'none' }} to="/posts">POSTS</Link>
              </li>
              <li>
                  <Link className="nav-link register-btn" style={{ textDecoration: 'none' }} to="/register">REGISTER</Link>
              </li>
          </ul>
      </nav>
  )
}

export default Navbar