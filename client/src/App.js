import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Header, Footer, Home, ProductDetail, Login } from './component'
import { Toaster } from 'react-hot-toast'
import './App.css';

const App = () => {

  return (
    <Router>
      <div className='App'>
        <Toaster />
        <Header />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/search/:keyword' element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App

