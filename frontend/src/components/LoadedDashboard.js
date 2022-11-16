import React, {useState, useEffect} from 'react'
import Doctor from '../images/dog-medicine.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPills, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment'

function LoadedDashboard() {
  
  // Create state that checks what medication the user currently has registered with their dog
  const [currentMeds, setCurrentMeds] = useState([])

  // Can we remove our updateMedication function by taking advantage of useEffect?
  // Maybe pass currentMeds as param and then clean up side effects? Will have to look into..
  // Set our currentMeds state to all of the medications in our db
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

  // Map over the current medication the user has registered, creating an element for each one to render inside of our component
  const meds = currentMeds.map((item, index)=>{
    return(
        <section key={index} className="medicationSummaryContainer">
            <div className="faIcon"><FontAwesomeIcon icon={faPills} size='2x'/></div>
            <div className="medicationSummary">
                <h3 style={{fontWeight: 400}}>{item.medicationName} {item.dosage}</h3>
                <h5 style={{fontWeight: 300}}>Prescribed on: <Moment format='MMMM Do, YYYY'>{item.prescriptionDate}</Moment></h5>
                <h5 style={{fontWeight: 300}}>Take {item.timesPerDay} time(s) per day</h5>
            </div>
            <div className="deleteBtn" onClick={() => deleteMedication(item._id)}><FontAwesomeIcon icon={faDeleteLeft} size='1x'/></div>
        </section>
    )
  })
  
  function deleteMedication(id){
    console.log(id)
  }
  
  // Create state that checks if the user would like to add additional medication to their dashboard, if so, toggle the appropriate form
  const [needMeds, setNeedMeds] = useState(null)

  //If the user needs to add meds, the state will update and present the proper component/form
   function addMeds(){
    setNeedMeds(true)
  }

    // Set state for form to add medication
    const [formData, setFormData] = useState({
      medicationName: '',
      dosage: '',
      timesPerDay: '',
      prescriptionDate: ''
    }) 
  
    // Update our form when inputs change, we are using controlled inputs
    function onChange(e){
      setFormData((prevValue)=>{
        return{
          ...prevValue,
          [e.target.name]: e.target.value
        }
      })
    }

  // Function to add (POST) medication if user needs to add more
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
        // Close medication form after submit
        setNeedMeds(null)
        // Clear form inputs to make them blank fields by changing the state back to empty string values
        setFormData({
          medicationName: '',
          dosage: '',
          timesPerDay: '',
          prescriptionDate: ''
        })
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

  // Create state for seizure logs and store all logs from the db in state
  const [seizureLog, setSeizureLog] = useState([])
  
  // Get all of our seizure logs when component renders
  useEffect(()=>{
    async function fetchData(){
      try {
        const response = await fetch(
          '/dashboard/getSeizureLogs'
        );
        const json = await response.json()
        setSeizureLog(json.seizures)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  // Create table rows to generate a table based upon seizure activity in the db
  const tableRows = seizureLog.map((item, index)=>{
    return(
        <tbody key={index}>
            <tr>
                <td><Moment format='MMMM Do, YYYY'>{item.seizureDate}</Moment></td>
                <td>{item.seizureLength} seconds</td>
                <td>{item.seizureTime}</td>
                <td>{item.seizureObservation}</td>
            </tr>
        </tbody>
    )
  })

  // Create state for form to add seizure information
  const [seizureFormData, setSeizureFormData] = useState({
    seizureDate: '',
    seizureLength: '',
    seizureTime: '',
    seizureObservation: ''
  })

  // Update seizure form when values change
  function seizureOnChange(e){
    setSeizureFormData((prevValue)=>{
        return {
            ...prevValue,
            [e.target.name]: e.target.value
        }
    })
  }
  
  // Add seizure to database
  async function postSeizure(e){
    e.preventDefault()
    try {
      const formInfo = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({seizureDate: seizureFormData.seizureDate, seizureLength: seizureFormData.seizureLength, seizureTime: seizureFormData.seizureTime, seizureObservation: seizureFormData.seizureObservation})
    }
        const response = await fetch('/dashboard/addSeizureLog', formInfo)
        const data = await response.json()
        console.log(data)
        setSeizureFormData({
          seizureDate: '',
          seizureLength: '',
          seizureTime: '',
          seizureObservation: ''
        })
        updateSeizureLog()
    } catch (error) {
      console.log(error)
    }
  }

  // Update state once seizure is added to cause table to re-render
  async function updateSeizureLog(){
    try {
      const response = await fetch(
        '/dashboard/getSeizureLogs'
      );
      const json = await response.json()
      setSeizureLog(json.seizures)
    } catch (error) {
      console.log(error)
    }
  }

  // Create state to determine whether or not the user would like to add a seizure to their log
  const [openSeizureLog, setOpenSeizureLog] = useState(false)

  //Open and close seizure log
  function openSeizureForm(){
    setOpenSeizureLog((prevValue)=> !prevValue)
  }

  function scrollToLog(){
    const log = document.getElementById('seizureLogContainer')
    log.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    })
  }

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
            <button onClick={scrollToLog}className="startTrackingBtn">Start Tracking</button>
        </header>
        <div className="dashboardMedicationContainer">
        <section className="medicationStatus">
            <h2 className="dashHeader">Ozzy's Medication</h2>
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
                      className="dateInput" 
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
        <section id="seizureLogContainer" className="seizureLogContainer">
            <h2 className="dashHeader">Ozzy's Seziure Log</h2>
            <button className="openSeizureFormBtn" onClick={openSeizureForm}>{openSeizureLog === true ? 'Close Form' : 'Log Seizure'}</button>
              {openSeizureLog === true && 
                            <form onSubmit={postSeizure} className="seizureForm">
                            <label>Date of Seizure: </label>
                            <input
                            className="seizureInput" 
                            type="date"
                            name="seizureDate"
                            value={seizureFormData.seizureDate}
                            onChange={seizureOnChange}
                            />
                            <label>Length of Seizure (seconds): </label>
                            <input
                            className="seizureInput" 
                            type="number"
                            name="seizureLength"
                            value={seizureFormData.seizureLength}
                            min="1"
                            max="1200"
                            onChange={seizureOnChange}
                            />
                            <label>Time of Seizure: </label>
                            <input
                            className="seizureInput"
                            type="time"
                            name="seizureTime"
                            value={seizureFormData.seizureTime}
                            onChange={seizureOnChange}
                            />
                            <label>Observations: </label>
                            <textarea 
                            className="seizureInput"
                            maxLength="150"
                            name="seizureObservation"
                            value={seizureFormData.seizureObservation}
                            onChange={seizureOnChange}
                            ></textarea>
                            <button>Log Activity</button>
                        </form>
              }
        </section>
        <section className="tableContainer">
          {/* If we have an active seizure log, render the table */}
              {seizureLog.length > 0 && 
              (
                
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Length</th>
                            <th>Time</th>
                            <th>Observations</th>
                        </tr>
                    </thead>
                            {tableRows}
                </table>
                
              )}
              {/* If there are no seizures currently logged, let the user know */}
              {!seizureLog.length && (
              
                <h1 style={{textAlign: 'center', paddingBottom: '3%'}}>No Seizure Activity to Show</h1>
              
              )}
        </section>
    </div>
  )
}

export default LoadedDashboard