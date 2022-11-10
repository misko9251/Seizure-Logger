import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    password2: ''
  })
  const [loggedUser, setLoggedUser] = useState('')

  const [errors, setErrors] = useState([])

  // Navigate to posts after successful login
  const navigate = useNavigate();

  function redirect(){
    navigate('/login')
  }

  function onChange(e){
    setFormData((prevValue)=>{
      return {
        ...prevValue,
        [e.target.name]: e.target.value
      }
    })
  }

  async function registerUser(e) {
    e.preventDefault()
    try {
      const formInfo = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    }
        const response = await fetch('/users/registerUser', formInfo)
        const data = await response.json()
        console.log(data)
        redirect()
    } catch (error) {
      console.log(error)
    }
}

  return (
      <div className="formContainer">
        <form className="registerForm" onSubmit={registerUser}>
        
          <h2 className="registerHeading">Register</h2>
          <input
          className="registerInput" 
          type='text'
          name='name'
          value={formData.name} 
          placeholder='Enter your name'
          onChange={onChange}
          />
          <input
          className="registerInput" 
          type='text'
          name='username'
          value={formData.username} 
          placeholder='Username'
          onChange={onChange}
          />
          <input
          className="registerInput" 
          type='password'
          name='password'
          value={formData.password} 
          placeholder='Password'
          onChange={onChange}
          />
          <input
          className="registerInput" 
          type='password'
          name='password2'
          value={formData.password2} 
          placeholder='Confirm password'
          onChange={onChange}
          />

          <button className="registerBtn" type='submit'>Enter</button>

        </form>
      </div>
  )
}

export default Register