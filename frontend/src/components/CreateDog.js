import React, {useState} from 'react'

function CreateDog() {
 
  // Create input to acquire the name of the dog
  const [formData, setFormData] = useState({
    dogName: ''
})


  function onChange(e){
    setFormData((prevValue)=> {
      return{
        ...prevValue,
        [e.target.name]: e.target.value
      }
    })
  }

  async function enterDogName(e) {
    try {
      const formInfo = {
        credentials: 'include',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({dogName: formData.dogName})
    }
        const response = await fetch('https://api.epipup.com/dashboard/enterDog', formInfo)
        const data = await response.json()
        window.localStorage.setItem('dog', true);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="formContainer">
      <form className="enterDogForm" onSubmit={enterDogName}>
      <h1>Welcome! Thanks for joining. What's your dog's name?</h1>
      <p>Dont worry, like everything else you'll share with us, we'll keep this private.</p>
        <input 
        className="dogNameInput"
        type="text"
        placeholder="Your dog's name"
        name="dogName"
        value={formData.dogName}
        onChange={onChange}
        />
        <button className="nextBtn">NEXT</button>
      </form>
    </div>
  )
}

export default CreateDog