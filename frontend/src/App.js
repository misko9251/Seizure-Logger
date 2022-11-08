import './App.css';
import Navbar from './components/Navbar/Navbar'
import Contact from './pages/contact'
import Ourpurpose from './pages/ourpurpose'
import Register from './pages/register'
import Home from './pages/Home'
import Posts from './pages/posts'
import Login from './pages/login'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import {AuthContextProvider} from './context/authContext'



function App() {
  return (
    <div>
      <AuthContextProvider>
        <Router>
            <Navbar />
              <Routes>
                <Route path='/' element ={<Home />} />
                <Route path='/posts' element ={<Posts />} />
                <Route path='/about' element={<Ourpurpose />} />
                <Route path='/register' element={<Register />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/login' element={<Login />} />
              </Routes>
            </Router>
        </AuthContextProvider>
    </div>
  );
}

export default App;
