import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Link, useNavigate, useLocation } from "react-router-dom";

import Loader from '../layout/loader'
import MetaData from '../layout/MetaData'

import { login, clearErrors } from '../../actions/user'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.user)
  const { loading, error, user, isAuthenticated } = userLogin

  const redirect = location.search ? "/" + location.search.split("=")[1] : "/"
  console.log(redirect, location.search)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors)
      return
    }

    if (isAuthenticated) {
      navigate(redirect)
    }
  }, [dispatch, error, isAuthenticated, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <MetaData title="Login" />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forgot/" className="float-end my-2">Forgot Password?</Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn w-100 py-3 mb-2"
                >
                  LOGIN
                </button>

                <br />

                <Link to="/register" className="float-end mb-3">New User?</Link>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Login
