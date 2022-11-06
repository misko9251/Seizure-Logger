import React, {useEffect, useState} from 'react'
import Axios from 'axios'

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    password2: ''
  })
  const [loggedUser, setLoggedUser] = useState('')

  const [errors, setErrors] = useState([])

  useEffect(()=>{
    
  }, [errors])

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
    } catch (error) {
      console.log(error.message)
    }
}

  return (
    <form onSubmit={registerUser}>

      <h2>Register</h2>

      <label>Name</label>
      <input 
      type='text'
      name='name'
      value={formData.name} 
      placeholder='Enter your name'
      onChange={onChange}
      />

      <label>Username</label>
      <input 
      type='text'
      name='username'
      value={formData.username} 
      placeholder='Username'
      onChange={onChange}
      />

      <label>Password</label>
      <input 
      type='password'
      name='password'
      value={formData.password} 
      placeholder='Password'
      onChange={onChange}
      />

      <label>Confirm Password</label>
      <input 
      type='password'
      name='password2'
      value={formData.password2} 
      placeholder='Confirm password'
      onChange={onChange}
      />

      <button type='submit'>Enter</button>

    </form>
  )
}

export default Register