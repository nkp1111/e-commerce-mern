import React from 'react'

import { images } from '../../assets'

const Header = () => {
  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <img src={images.logo} alt="logo" />
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              className="form-control"
              placeholder="Enter Product Name ..."
              aria-label="Username"
              aria-describedby="search-icon"
            />

            <div className="input-group-append" id="search-icon">
              <button id="search_btn" className="btn">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <button className="btn" id="login_btn">Login</button>

          <span id="cart" className="ms-3">Cart</span>
          <span className="ms-1" id="cart_count">2</span>
        </div>
      </nav >
    </>
  )
}

export default Header
