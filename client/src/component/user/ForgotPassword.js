import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";

import Loader from '../layout/loader'
import MetaData from '../layout/MetaData'


import { forgotPassword, clearErrors } from '../../actions/user'

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(state => state.forgotPassword);

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors)
      return
    }

    console.log(message)

    if (message) {
      toast.success(message)
    }

  }, [dispatch, error, message]);

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("email", email)
    dispatch(forgotPassword(formData))
  }

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <MetaData title="Forgot password" />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg"
                onSubmit={submitHandler}>
                <h1 className="mb-3">Forgot Password</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Enter Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  id="forgot_password_button"
                  type="submit"
                  className="btn w-100 py-3"
                  disabled={loading ? true : false}>
                  Send Email
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ForgotPassword
