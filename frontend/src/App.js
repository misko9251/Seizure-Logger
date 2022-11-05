import './App.css';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/home'
import Contact from './pages/contact'
import Ourpurpose from './pages/ourpurpose'
import Register from './pages/register'
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
          <Route path='/home' element ={<Home />} />
          <Route path='/about' element={<Ourpurpose />} />
          <Route path='/register' element={<Register />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
