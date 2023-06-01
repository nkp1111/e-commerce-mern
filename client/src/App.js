import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Header, Footer, Home } from './component'
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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App

