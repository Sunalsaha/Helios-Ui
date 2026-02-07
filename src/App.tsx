import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from "./auth/Login"
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import AboutUs from './pages/AboutUs'
import Product from './pages/Product'
import ProductDislouse from './pages/ProductDisclouse'



function App() {
  return <>
      <Router>
        <Routes>
         <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/about" element={<AboutUs/>} />
         <Route path="/products" element={<Product/>} />
          <Route path="/disclouse" element={<ProductDislouse/>} />
         
          {/* Add other routes here */}
        </Routes>
      </Router>
      
    </>
}

export default App
