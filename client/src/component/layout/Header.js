import React, { useEffect } from 'react'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

import { images } from '../../assets'
import Search from './search'
import { logout } from '../../actions/user'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, user } = useSelector((state) => state.user)

  const logoutHandler = () => {
    dispatch(logout())
    toast.success("User Logged out Successfully.")
    navigate("/")
  }

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
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ms-3">Cart</span>
            <span className="ms-1" id="cart_count">2</span>
          </Link>
          {user
            ?
            <div className="ms-4 dropdown d-inline">
              <button className="btn dropdown-toggle text-white me-4" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <figure className="avatar avatar-nav">
                  <img src={user?.avatar && user?.avatar.url} alt={user?.name} className='rounded-circle' />
                </figure>
                <span>{user?.name}</span>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {
                  user && user.role !== "admin"
                    ? <Link to="/orders/me" className='dropdown-item'>Orders</Link>
                    : <Link to="/dashboard" className='dropdown-item'>Dashboard</Link>
                }
                <Link to="/me" className='dropdown-item'>Profile</Link>
                <Link className='dropdown-item text-danger' onClick={logoutHandler}>
                  Logout
                </Link>
              </ul>
            </div>
            : !loading && <Link to="/login" className="btn ms-4" id="login_btn">Login</Link>}

        </div>
      </nav >
    </>
  )
}

export default Header
