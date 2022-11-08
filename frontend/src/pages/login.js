import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

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

  function redirect(){
    navigate('/posts')
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
        console.log(data)
        redirect()
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