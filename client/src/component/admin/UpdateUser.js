import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from "react-router-dom";

import Loader from '../layout/loader'
import MetaData from '../layout/MetaData'
import { UPDATE_USER_RESET } from '../../constants/user'

import { clearErrors, updateUser, getUserDetail } from '../../actions/user'

const UpdateUser = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userDetail)
  const { loading, error, isUpdated, isUploaded } = useSelector(state => state.userProfile)
  const { id } = useParams()

  useEffect(() => {

    if (!user || user._id !== id) {
      dispatch(getUserDetail(id))
    }

    if (error) {
      toast.error(error)
      dispatch(clearErrors)
      return
    }

    if (user) {
      setName(user.name)
      setEmail(user.email)
      setRole(user.role)
    }

    if (isUploaded) {
      toast.success("User updated successfully")
      navigate("/admin/users")
      dispatch({ type: UPDATE_USER_RESET })
    }

  }, [dispatch, error, id, isUploaded, navigate, user]);



  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set("name", name)
    formData.set("email", email)
    formData.set("role", role)
    dispatch(updateUser(id, formData))
  }

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <MetaData title="Update user" />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mt-2 mb-5">Update User</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name='name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role_field">Role</label>

                  <select
                    id="role_field"
                    className="form-control"
                    name='role'
                    value={role}
                    onChange={e => setRole(e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <button type="submit" className="btn update-btn w-100 mt-4 mb-3"  >Update</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default UpdateUser
