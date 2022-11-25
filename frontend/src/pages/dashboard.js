import React, {useState, useEffect} from 'react'
import CreateDog from '../components/CreateDog'
import Medication from '../components/Medication'
import LoadedDashboard from '../components/LoadedDashboard'

function Dashboard() {

    const [createDog, setCreateDog] = useState(null)
    const [medication, setMedication] = useState(null)
    
    useEffect(()=>{
      async function fetchData(){
        try {
          const response = await fetch(
            'https://whats-up-epi-pup.herokuapp.com/dashboard/getDog',
            {credentials: 'include'}
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
            'https://whats-up-epi-pup.herokuapp.com/dashboard/getFirstMedication',
            {credentials: 'include'}
          );
          const json = await response.json()
          json.medication.length > 0 ? setMedication(true) : setMedication(false)
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    }, [])

  //   if(createDog === false){
  //     return <CreateDog />
  //   }if(createDog === true && medication === false){
  //     return <Medication />
  //   }if(createDog === true && medication === true){
  //     return <LoadedDashboard />
  //   }else{
  //     return (
  //       <div className="loadingScreen">
  //         <span className="loader"></span>
  //       </div>
  //     )
  //   }
    
    return(
      <LoadedDashboard />
    )

}


export default Dashboard