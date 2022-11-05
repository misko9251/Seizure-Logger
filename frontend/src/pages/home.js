import React, {useEffect, useState} from 'react'

function Home() {

  const [awesomeDogs, setAwesomeDogs] = useState([])

  useEffect(()=>{
    async function fetchData(){
      try {
        const response = await fetch(
          '/home'
        );
        const json = await response.json()
        setAwesomeDogs(json)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])


  const pups = awesomeDogs.bestDogs?.map((dog)=> {
    return(
      <h1>{dog}</h1>
    )
  })

  return (
    <>
        <div>Whats up, Awesome Pups?</div>
        {pups}
        <h5>Wow those dogs rock</h5>
    </>

  )
}

export default Home