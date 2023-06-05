import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'

import { images } from '../../assets'
import Search from './search'

const Header = () => {
  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src={images.logo} alt="logo" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/login" className="btn" id="login_btn">Login</Link>

          <span id="cart" className="ms-3">Cart</span>
          <span className="ms-1" id="cart_count">2</span>
        </div>
      </nav >
    </>
  )
}

export default Header
