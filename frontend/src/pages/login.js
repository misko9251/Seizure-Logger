import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../context/authContext'

function Login() {

  const {setAuth} = useAuth()

  // Create state for login data
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  // Update state when inputs are filled out
  function onChange(e){
    setFormData((prevValue)=>{
      return {
        ...prevValue,
        [e.target.name]: e.target.value
      }
    })
  }

  // Navigate to posts after successful login
  const navigate = useNavigate();

  // Redirect functions
  function redirect(){
    navigate('/dashboard')
  }
  function redirectToRegister(){
    navigate('/register')
  }

  // Login on submit
  async function login(e){
    e.preventDefault()
    try {
      const formInfo = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: formData.username, password: formData.password})
    }
        const response = await fetch('/users/login', formInfo)
        const data = await response.json()
        setAuth(true)
        window.localStorage.setItem('auth', true);
        redirect()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="formContainer">
      <form className="loginForm" onSubmit={login}>
          <h2 className="loginHeading">Login to continue!</h2>
          <input
          className="loginInput" 
          type='text' 
          name='username'
          value={formData.username}
          placeholder='Username'
          onChange={onChange} 
          />
          <input
          className="loginInput" 
          type='password' 
          name='password'
          value={formData.password}
          placeholder='Password' 
          onChange={onChange}
          />
          <button className="loginBtn">LOGIN</button>
          <div>
            <h2 className="registerRoute">New here? <span onClick={redirectToRegister}>Sign up</span></h2>
          </div>
      </form>
    </div>
  )
}

export default Login