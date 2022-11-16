import './App.css';
import Navbar from './components/Navbar/Navbar'
import UnauthNavbar from './components/Navbar/UnauthNavbar';
import Ourpurpose from './pages/ourpurpose'
import Register from './pages/register'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useAuth } from './context/authContext';
import { useState, useEffect } from 'react'



function App() {

  const { auth } = useAuth()
  // const [user, setUser] = useState(null)

  // useEffect(()=>{
  //   async function fetchData(){
  //     try {
  //       const response = await fetch(
  //         '/getUser'
  //       );
  //       const json = await response.json()
  //       setUser(json.user)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchData()
  // }, [])

  return (
    <div>
        <Router>
            {localStorage.auth ? <Navbar /> : <UnauthNavbar />}
              <Routes>
                <Route path='/' element ={<Home />} />
                <Route path='/dashboard' element ={localStorage.auth ? <Dashboard /> : <Login />} />
                <Route path='/about' element={<Ourpurpose />} />
                <Route path='/register' element={!localStorage.auth ? <Register /> : <Dashboard />} />
                <Route path='/login' element={!localStorage.auth ? <Login /> : <Dashboard />}  />
              </Routes>
            </Router>
    </div>
  );
}

export default App;
