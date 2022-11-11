import React, {useState, useEffect} from 'react'
import CreateDog from '../components/CreateDog'
import Medication from '../components/Medication'

function Dashboard() {

    const [createDog, setCreateDog] = useState(null)
    const [medication, setMedication] = useState(null)
    
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
    }, [])

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
    }, [])

    if(createDog === false){
      return <CreateDog />
    }if(createDog === true && medication === false){
      return <Medication />
    }if(createDog === true && medication === true){
      return <h1>Hi Matt & Ozzy! Welcome to your Dashboard.</h1>
    }else{
      return (
        <div className="loadingScreen">
          <span class="loader"></span>
        </div>
      )
    }
    
  }

export default Dashboard