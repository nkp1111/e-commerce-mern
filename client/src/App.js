import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Header, Footer, Home, ProductDetail, Login, Register, Profile, UpdateProfile, UpdatePassword, ForgotPassword, ResetPassword, Cart, ProtectedRoute, Shipping, ConfirmOrder, Payment, OrderSuccess, ListOrders, DetailsOrder, Dashboard, ProductList, NewProduct, UpdateProduct, OrderList, ProcessOrder, UserList } from './component'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { loadUser } from './actions/user'
import store from './store'
import { useSelector } from 'react-redux'
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

  const { user } = useSelector(state => state.user)

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

            <Route path="/order/:id"
              element={
                <ProtectedRoute>
                  <DetailsOrder />
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

        <Routes>
          <Route path="/dashboard"
            element={
              <ProtectedRoute {...{ isAdmin: true }}>
                <Dashboard />
              </ProtectedRoute>
            }
            exact />

          <Route path="/admin/products"
            element={
              <ProtectedRoute {...{ isAdmin: true }}>
                <ProductList />
              </ProtectedRoute>
            }
            exact />

          <Route path="/admin/product"
            element={
              <ProtectedRoute {...{ isAdmin: true }}>
                <NewProduct />
              </ProtectedRoute>
            }
            exact />

          <Route path="/admin/product/:id"
            element={
              <ProtectedRoute {...{ isAdmin: true }}>
                <UpdateProduct />
              </ProtectedRoute>
            }
            exact />

          <Route path="/admin/orders"
            element={
              <ProtectedRoute {...{ isAdmin: true }}>
                <OrderList />
              </ProtectedRoute>
            }
            exact />

          <Route path="/admin/order/:id"
            element={
              <ProtectedRoute {...{ isAdmin: true }}>
                <ProcessOrder />
              </ProtectedRoute>
            }
            exact />

          <Route path="/admin/users"
            element={
              // <ProtectedRoute {...{ isAdmin: true }}>
              <UserList />
              // </ProtectedRoute>
            }
            exact />

        </Routes>
        {user && user.role !== "admin" && (
          <Footer />
        )}

      </div>
    </Router >
  )
}

export default App

