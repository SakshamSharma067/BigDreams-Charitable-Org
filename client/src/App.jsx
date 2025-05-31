import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Campaigns from './pages/Campaigns'
import Donate from './pages/Donate'
import Volunteer from './pages/Volunteer'
import About from './pages/About'
import Contact from './pages/Contact'
const App = () => {
  return (
    <div>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/campaigns' element={<Campaigns />} />
      <Route path='/donate' element={<Donate />} />
      <Route path='/volunteer' element={<Volunteer />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
    </Routes>
    </div>
  )
}

export default App
