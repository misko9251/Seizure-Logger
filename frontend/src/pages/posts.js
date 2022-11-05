import React, {useState, useEffect} from 'react'

function Posts() {

    const [formData, setFormData] = useState({
        text: ''
    })

    const log = false

    function onChange(e){
        setFormData((prevValue)=>{
            return {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        })
    }

    function submitForm(){
        
    }

    console.log(formData)

    return (
      <>
          <form onSubmit={submitForm}>
              <label>Seizure Info</label>
              <input 
              type="text"
              id="text"
              name="text"
              value={formData.email}
              placeholder="Enter Seizure Information"
              onChange={onChange}
              />
              <button type="submit">Post</button>
          </form>
          <div>
              <h2>Seizure Activity Log</h2>
              {log ? 'hey' : <p>You have no logs currently.</p>}
          </div>
      </>
    )
}

export default Posts