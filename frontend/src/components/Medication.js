import React, {useState, useEffect} from 'react'

function Medication() {

  const [formData, setFormData] = useState({
    medicationName: '',
    dosage: '',
    timesPerDay: ''
  }) 

  function onChange(e){
    setFormData((prevValue)=>{
      return{
        ...prevValue,
        [e.target.name]: e.target.value
      }
    })
  }

  async function postMedication(e) {
    try {
      const formInfo = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({medicationName: formData.medicationName, dosage: formData.dosage, timesPerDay: formData.timesPerDay})
    }
        const response = await fetch('/dashboard/addFirstMedication', formInfo)
        const data = await response.json()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="formContainer">
      <form className="enterMedicationForm" onSubmit={postMedication}>
      <h1>Let's start by adding your dog's medication.</h1>
      <p>Does your dog take more than one medication? Don't worry, we can add more in your dashboard on the next page.</p>
        <input
        className="medicationInput" 
        type="text"
        name="medicationName"
        placeholder="Your dog's medication"
        value={formData.medicationName}
        onChange={onChange}
        />
        <input
        className="medicationInput" 
        type="text"
        name="dosage"
        placeholder="Dosage (Example: 120mg)"
        value={formData.dosage}
        onChange={onChange}
        />
        <input
        className="medicationInput" 
        type="text"
        name="timesPerDay"
        placeholder="Frequency (Times per day)"
        value={formData.timesPerDay}
        onChange={onChange}
        />
        <button className="nextBtn">NEXT</button>
      </form>
    </div>
  )
}

export default Medication