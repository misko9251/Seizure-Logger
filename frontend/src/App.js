import './App.css';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Contact from './pages/contact'
import Ourpurpose from './pages/ourpurpose'
import Register from './pages/register'
import Home from './pages/Home'
import Posts from './pages/posts'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element ={<Home />} />
          <Route path='/posts' element ={<Posts />} />
          <Route path='/about' element={<Ourpurpose />} />
          <Route path='/register' element={<Register />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
