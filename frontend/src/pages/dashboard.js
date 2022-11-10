import React, {useState, useEffect} from 'react'

function Posts() {

    // Create state for form
    const [formData, setFormData] = useState({
        text: ''
    })

    // Create state for all seizure logs/posts
    const [posts, setPosts] = useState({})

    // Create state for logged in user
    const [user, setUser] = useState('')

    // Fetch all of our posts whenever the component mounts
    useEffect(()=>{
        async function fetchData(){
          try {
            const response = await fetch(
              '/myPosts'
            );
            const json = await response.json()
            setPosts(json.posts)
          } catch (error) {
            console.log(error)
          }
        }
        fetchData()
      }, [posts])

      // Fetch our logged in user on render
      useEffect(()=>{
        async function fetchData(){
          try {
            const response = await fetch(
              '/myPosts'
            );
            const json = await response.json()
            setUser(json.user)
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
        console.log(data)
        e.target.reset()
    }


    return (
      <>
          <form onSubmit={submitForm}>
            {user && <h1>Welcome back, {user[0].toUpperCase() + user.slice(1).toLowerCase()}</h1>}
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
              {posts.length > 0 ? posts.map((item, index)=> <h2 className="seizure-post-container" key={index}>{item.text}</h2>) : 'No posts to show'}
          </div>
      </>
    )
}

export default Posts