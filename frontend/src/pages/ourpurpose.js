import React, {useState, useEffect} from 'react'

function Ourpurpose() {

  const [users, setUsers] = useState([])

  useEffect(()=>{
    async function fetchData(){
      try {
        const response = await fetch(
          '/getUsers'
        );
        const json = await response.json()
        setUsers(json)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

const people = users.map((item)=> {
  return(
    <div>{item.username}</div>
  )
})

  return (
    <>
        <h3>OUR PURPOSE</h3>
        <p>Our purpose is to give you a spot to log all of your dogs seizures.</p>
        {people}
    </>
  )
}

export default Ourpurpose