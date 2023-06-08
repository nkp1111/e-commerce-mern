import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";

import Loader from '../layout/loader'
import MetaData from '../layout/MetaData'
import { UPDATE_PASSWORD_RESET } from '../../constants/user'

import { updatePassword, clearErrors } from '../../actions/user'

const UpdatePassword = () => {

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isUploaded } = useSelector(state => state.userProfile)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors)
      return
    }

    if (isUploaded) {
      toast.success("Password updated successfully")

      navigate("/me")

      dispatch({ type: UPDATE_PASSWORD_RESET })
    }

  }, [dispatch, error, isUploaded, navigate]);

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("oldPassword", password)
    formData.append("password", newPassword)
    formData.append("confirmPassword", confirmPassword)
    dispatch(updatePassword(formData))
  }

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <MetaData title="Update password" />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mt-2 mb-5">Update Password</h1>

                <div className="form-group">
                  <label className='form-label' htmlFor="old_password_field">Old Password</label>
                  <input
                    type="password"
                    id="old_password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className='form-label' htmlFor="new_password_field">New Password</label>
                  <input
                    type="password"
                    id="new_password_field"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className='form-label' htmlFor="new_password_confirm">Confirm Password</label>
                  <input
                    type="password"
                    id="new_password_confirm"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default UpdatePassword
