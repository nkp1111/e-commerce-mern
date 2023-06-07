import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";

import Loader from '../layout/loader'
import MetaData from '../layout/MetaData'

import { register, clearErrors } from '../../actions/user'

const Profile = () => {

  const { user, loading } = useSelector((state) => state.user)
  console.log(user)
  return (
    <>
      {loading ? <Loader /> : (
        <>
          <MetaData title="My Profile" />
          <h2 className="mt-5 ms-5">My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className='avatar avatar-profile'>
                <img className="rounded-circle img-fluid" src={user?.avatar && user.avatar.url} alt={user.name} />
              </figure>
              <Link to="/me/update" id="edit_profile" className="btn btn-primary w-100 my-5">
                Edit Profile
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{user.name}</p>

              <h4>Email Address</h4>
              <p>{user.email}</p>

              <h4>Joined On</h4>
              <p>{String(user.createdAt).substring(0, 10)}</p>

              {user.role !== "admin" && (
                <Link to="/orders/me" className="btn btn-danger w-100 mt-5">
                  My Orders
                </Link>
              )}

              <Link to="/password/update" className="btn btn-primary w-100 mt-3">
                Change Password
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Profile
