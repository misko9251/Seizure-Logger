import React from 'react'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

function Navbar() {
  return (
      <nav>
          <ul>
              <li>
                <Link to="/home">HOME</Link>
              </li>
              <li>
                  <Link to="/about">OUR PURPOSE</Link>
              </li>
              <li>
                  <Link to="/register">REGISTER</Link>
              </li>
          </ul>
      </nav>
  )
}

export default Navbar