import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Header, Footer, Home, ProductDetail, Login, Register, Profile, UpdateProfile, UpdatePassword, ForgotPassword, ResetPassword, Cart, ProtectedRoute, Shipping, ConfirmOrder, Payment, OrderSuccess, ListOrders } from './component'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { loadUser } from './actions/user'
import store from './store'
import './App.css';

const App = () => {

  const [stripeApi, setStripeApi] = useState("");

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripeApi() {
      const { data } = await axios.get("/api/v1/stripe_api")
      setStripeApi(data.apiKey)
    }

    getStripeApi()
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

            <Route path="/success"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
              exact />

            <Route path="/orders/me"
              element={
                <ProtectedRoute>
                  <ListOrders />
                </ProtectedRoute>
              }
              exact />

          </Routes>


          {stripeApi && (
            <Elements stripe={loadStripe(stripeApi)}>
              <Routes>
                <Route path="/payment"
                  element={
                    <ProtectedRoute>
                      <Payment />
                    </ProtectedRoute>
                  }
                  exact />
              </Routes>
            </Elements>
          )}
        </div>
        <Footer />
      </div>
    </Router >
  )
}

export default App

