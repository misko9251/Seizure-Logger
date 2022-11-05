import React, {useState, useEffect} from 'react'

function Posts() {

    // Create state for form
    const [formData, setFormData] = useState({
        text: ''
    })

    // Fetch all of our posts whenever the component mounts
    useEffect(()=>{
        async function fetchData(){
          try {
            const response = await fetch(
              '/myPosts'
            );
            const json = await response.json()
            setFormData(json)
          } catch (error) {
            console.log(error)
          }
        }
        fetchData()
      }, [])

    // Update state on change of input
    function onChange(e){
        setFormData((prevValue)=>{
            return {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        })
    }

    // Post to mongoDB on submit
    async function submitForm(e){
        e.preventDefault()
        const formInfo = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        }
        const response = await fetch('/createPost', formInfo)
        const data = await response.json()
        setFormData(data)
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
          </div>
      </>
    )
}

export default Posts