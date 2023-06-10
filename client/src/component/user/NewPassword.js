import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from "react-router-dom";

import Loader from '../layout/loader'
import MetaData from '../layout/MetaData'

import { resetPassword, clearErrors } from '../../actions/user'

const NewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams()

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, error, success } = useSelector(state => state.forgotPassword)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors)
      return
    }

    if (success) {
      toast.success("Password Updated successfully")
      navigate("/login")
    }

  }, [dispatch, error, navigate, success]);


  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("password", password)
    formData.append("confirmPassword", confirmPassword)
    dispatch(resetPassword(token, formData))
  }

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <MetaData title="Reset password" />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">New Password</h1>

                <div className="form-group">
                  <label className="form-label" htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="confirm_password_field">Confirm Password</label>
                  <input
                    type="password"
                    id="confirm_password_field"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button
                  id="new_password_button"
                  type="submit"
                  className="btn w-100 py-3">
                  Set Password
                </button>

              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default NewPassword
