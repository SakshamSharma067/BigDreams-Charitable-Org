import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Campaigns from './pages/Campaigns'
import Donate from './pages/Donate'
import Volunteer from './pages/Volunteer'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateCampaign from './pages/CreateCampaign'
import EditCampaign from './pages/EditCampaign'
import CampaignDetails from './pages/CampaignDetails'
import { useAppContext } from './context/AppContext'
import Footer from './components/Footer'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext'
import { ToastContainer } from 'react-toastify'
import ScrollToTop from './components/ScrollToTop'
import 'react-toastify/dist/ReactToastify.css'


// Protected Route Component
const ProtectedVolunteerRoute = ({ children }) => {
  const { isAuthenticated, isVolunteer } = useAppContext();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  if (!isVolunteer()) {
    return <Navigate to="/campaign" />;
  }
  
  return children;
};

const App = () => {
  return (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <ScrollToTop />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/campaign" element={<Campaigns />} />
              <Route 
                path="/campaign/create" 
                element={
                  <ProtectedVolunteerRoute>
                    <CreateCampaign />
                  </ProtectedVolunteerRoute>
                } 
              />
              <Route 
                path="/campaign/edit/:id" 
                element={
                  <ProtectedVolunteerRoute>
                    <EditCampaign />
                  </ProtectedVolunteerRoute>
                } 
              />
              <Route path="/donate" element={<Donate />} />
              <Route path="/donate/:campaignId" element={<Donate />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/campaign/:id" element={<CampaignDetails />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
  )
}

export default App
