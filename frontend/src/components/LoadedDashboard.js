import React, {useState, useEffect} from 'react'
import Doctor from '../images/dog-medicine.png'

function LoadedDashboard() {
  
  const [needMeds, setNeedMeds] = useState(null)
  const [currentMeds, setCurrentMeds] = useState([])

  const meds = currentMeds.map((item, index)=>{
    return(
        <p key={index}>{item.medicationName} {item.dosage} {item.timesPerDay} time(s) per day.</p>
    )
  })

console.log(meds)
  useEffect(()=>{
    async function fetchData(){
      try {
        const response = await fetch(
          '/dashboard/getFirstMedication'
        );
        const json = await response.json()
        setCurrentMeds(json.medication)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [currentMeds])


  function addMeds(){
    setNeedMeds(true)
  }

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
    e.preventDefault()
    try {
      const formInfo = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({medicationName: formData.medicationName, dosage: formData.dosage, timesPerDay: formData.timesPerDay})
    }
        const response = await fetch('/dashboard/addFirstMedication', formInfo)
        const data = await response.json()
        setNeedMeds(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mainDashboardContainer">
        <header className="dashboardHeader" style={{
            backgroundImage: `url(${Doctor})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right bottom'
        }}>
            <h5>Welcome back to your</h5>
            <p>Seizure tracking manager</p>
            <button className="startTrackingBtn">Start Tracking</button>
        </header>
        <div className="dashboardMedicationContainer">
        <section className="medicationStatus">
            <h2>Ozzy's Medication(s)</h2>
            {meds}
        </section>
        <section className="addMedication">
            {needMeds && (
                <>
                    <form className="addOneMed" onSubmit={postMedication}>
                      <h1>Add a medication below!</h1>
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
                      <button className="addOneMedBtn">Add</button>
                    </form>
                </>
            )}
            {!needMeds && (
                <>
                    <h2>Adding more medication?</h2>
                    <p>Click below to add more medication.</p>
                    <button className="addOneMedBtn" onClick={addMeds}>Add Meds</button>
                </>
            )}
        </section>
        </div>
    </div>
  )
}

export default LoadedDashboard