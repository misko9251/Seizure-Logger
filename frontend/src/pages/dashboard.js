import React, {useState, useEffect} from 'react'
import CreateDog from '../components/CreateDog'
import Medication from '../components/Medication'

function Dashboard() {

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

    const [createDog, setCreateDog] = useState(false)
    const [medication, setMedication] = useState(false)

  // Create <CreateDog /> component asking for dog's name 'Welcome! What is your dog's name? Dont worry, like everything you share with us, we'll keep this private'
    // Check if user has already created a dog, if FALSE then render CreateDog

    useEffect(()=>{
      async function fetchData(){
        try {
          const response = await fetch(
            '/dashboard/getDog'
          );
          const json = await response.json()
          json.dog.length > 0 ? setCreateDog(true) : setCreateDog(false)
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    }, [createDog])

    useEffect(()=>{
      async function fetchData(){
        try {
          const response = await fetch(
            '/dashboard/getFirstMedication'
          );
          const json = await response.json()
          json.medication.length > 0 ? setMedication(true) : setMedication(false)
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    }, [medication])

    if(!createDog){
      return <CreateDog />
    }if(createDog && !medication){
      return <Medication />
    }
    return <h1>Hey</h1>
  }

export default Dashboard