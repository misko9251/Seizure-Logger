import './App.css';
import Navbar from './components/Navbar/Navbar'
import UnauthNavbar from './components/Navbar/UnauthNavbar';
import Ourpurpose from './pages/ourpurpose'
import Register from './pages/register'
import Home from './pages/Home'
import Posts from './pages/posts'
import Login from './pages/login'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useAuth } from './context/authContext';



function App() {

  const { auth } = useAuth()

  return (
    <div>
        <Router>
            {auth ? <Navbar /> : <UnauthNavbar />}
              <Routes>
                <Route path='/' element ={<Home />} />
                <Route path='/posts' element ={<Posts />} />
                <Route path='/about' element={<Ourpurpose />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
              </Routes>
            </Router>
    </div>
  );
}

export default App;
