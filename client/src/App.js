import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Header, Footer, Home, ProductDetail, Login, Register, Profile, UpdateProfile, UpdatePassword, ForgotPassword, ResetPassword, Cart, ProtectedRoute, Shipping, ConfirmOrder } from './component'
import { Toaster } from 'react-hot-toast'

import { loadUser } from './actions/user'
import store from './store'
import './App.css';

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

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
            <Route path="/register" element={<Register />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/me"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

            <Route path="/me/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              } />

            <Route path="/password/update"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              } exact />

            <Route path="/password/forgot" element={<ForgotPassword />} exact />

            <Route path="/password/reset/:token" element={<ResetPassword />} />

            <Route path="/shipping"
              element={
                <ProtectedRoute>
                  <Shipping />
                </ProtectedRoute>
              }
              exact />

            <Route path="/confirm"
              element={
                <ProtectedRoute>
                  <ConfirmOrder />
                </ProtectedRoute>
              }
              exact />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router >
  )
}

export default App

