import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import MuslimDating from './pages/MuslimDating'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/muslim-dating" element={<MuslimDating />} />
      </Routes>
    </Router>
  )
}

export default App

