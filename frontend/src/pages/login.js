import React, {useState} from 'react'
import Axios from "axios";

function Login() {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  function onChange(e){
    setFormData((prevValue)=>{
      return {
        ...prevValue,
        [e.target.name]: e.target.value
      }
    })
  }

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
        console.log(data)
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
    <form onSubmit={login}>
        <h2>Login</h2>
        <input 
        type='text' 
        name='username'
        value={formData.username}
        placeholder='username'
        onChange={onChange} 
        />
        <input 
        type='password' 
        name='password'
        placeholder='password' 
        onChange={onChange}
        />
        <button>Submit</button>
    </form>
    </>
  )
}

export default Login