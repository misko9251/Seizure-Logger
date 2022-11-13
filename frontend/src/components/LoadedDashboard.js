import React, {useState, useEffect} from 'react'
import Doctor from '../images/dog-medicine.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPills } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment'

function LoadedDashboard() {
  
  // Create state that checks if the user would like to add additional medication to their dashboard, if so, toggle the appropriate form
  const [needMeds, setNeedMeds] = useState(null)
  // Create state that checks what medication the user currently has registered with their dog
  const [currentMeds, setCurrentMeds] = useState([])
 
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // Map over the current medication the user has registered, creating an element for each one
  const meds = currentMeds.map((item, index)=>{
    return(
        <section key={index} className="medicationSummaryContainer">
            <div className="faIcon"><FontAwesomeIcon icon={faPills} size='2x'/></div>
            <div className="medicationSummary">
                <h3 style={{fontWeight: 400}}>{item.medicationName} {item.dosage}</h3>
                <h5 style={{fontWeight: 300}}>Prescribed on: <Moment format='MMMM Do, YYYY'>{item.prescriptionDate}</Moment></h5>
                <h5 style={{fontWeight: 300}}>Take {item.timesPerDay} time(s) per day</h5>
            </div>
        </section>
    )
  })
  

  // Can we remove our updateMedication function by taking advantage of useEffect?
  // Maybe pass currentMeds as param and then clean up side effects? Will have to look into..
  useEffect(()=>{
    async function fetchData(){
      try {
        const response = await fetch(
          '/dashboard/getAllMedication'
        );
        const json = await response.json()
        setCurrentMeds(json.medication)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  
  //If the user needs to add meds, the state will update and present the proper component/form
   function addMeds(){
    setNeedMeds(true)
  }

  // Function to add medication if user needs to add more
  async function postMedication(e) {
    e.preventDefault()
    try {
      const formInfo = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({medicationName: formData.medicationName, dosage: formData.dosage, timesPerDay: formData.timesPerDay, prescriptionDate: formData.prescriptionDate})
    }
        const response = await fetch('/dashboard/addMedication', formInfo)
        const data = await response.json()
        console.log(data)
        setNeedMeds(null)
        updateMedication()
    } catch (error) {
      console.log(error)
    }
  }

  // Medication is updated if user adds medication
  async function updateMedication(){
    try {
      const response = await fetch(
        '/dashboard/getAllMedication'
      );
      const json = await response.json()
      setCurrentMeds(json.medication)
    } catch (error) {
      console.log(error)
    }
  }
  
  // Set state for form to add medication
  const [formData, setFormData] = useState({
    medicationName: '',
    dosage: '',
    timesPerDay: '',
    prescriptionDate: ''
  }) 

  // Update our form when inputs change
  function onChange(e){
    setFormData((prevValue)=>{
      return{
        ...prevValue,
        [e.target.name]: e.target.value
      }
    })
  }

  // Get day of week
  const dayOfWeekName = new Date().toLocaleString( // Use this to get the day of the week
    'default', {weekday: 'long'}
  );
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const d = new Date();
  let monthName = month[d.getMonth()];

  return (
    <div className="mainDashboardContainer">
        <header className="dashboardHeader" style={{
            backgroundImage: `url(${Doctor})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right bottom'
        }}>
            <h5>Take your epilepsy care to a</h5>
            <p>powerful new level</p>
            <button className="startTrackingBtn">Start Tracking</button>
        </header>
        <div className="dashboardMedicationContainer">
        <section className="medicationStatus">
            {/* <h2 style={{marginTop: '5%', fontWeight: '400', fontSize: '1rem'}}>{dayOfWeekName}, {monthName} {d.getDate()}</h2>
            <p style={{marginBottom: '5%'}}>{currentMeds.length === 1 ? `${currentMeds.length} Medication` : `${currentMeds.length} Medications`}</p> */}
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
                      <input
                      className="medicationInput" 
                      type="date"
                      name="prescriptionDate"
                      placeholder="Date Prescribed"
                      value={formData.prescriptionDate}
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