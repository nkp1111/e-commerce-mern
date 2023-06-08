import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";

import Loader from '../layout/loader'
import MetaData from '../layout/MetaData'
import { UPDATE_PROFILE_RESET } from '../../constants/user'

import { updateProfile, clearErrors, loadUser } from '../../actions/user'

const UpdateProfile = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("https://source.unsplash.com/random/?avatar");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user)
  const { loading, error, isUpdated } = useSelector(state => state.userProfile)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors)
      return
    }

    if (user) {
      setName(user.name)
      setEmail(user.email)
      setAvatarPreview(user?.avatar?.url)
    }

    if (isUpdated) {
      toast.success("User updated successfully")
      dispatch(loadUser())

      navigate("/me")

      dispatch({ type: UPDATE_PROFILE_RESET })
    }

  }, [dispatch, error, isUpdated, navigate, user]);


  const onChange = (e) => {
    const { name, value } = e.currentTarget

    if (name === "avatar" && value !== "") {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("image", avatar)
    dispatch(updateProfile(formData))
  }

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <MetaData title="Update profile" />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" encType='multipart/form-data'
                onSubmit={submitHandler}>
                <h1 className="mt-2 mb-5">Update Profile</h1>

                <div className="form-group">
                  <label htmlFor="email_field">Name</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='avatar_upload'>Avatar</label>
                  <div className='d-flex align-items-center'>
                    <div>
                      <figure className='avatar me-3 item-rtl'>
                        <img
                          src={avatarPreview}
                          className='rounded-circle'
                          alt='Avatar Preview'
                        />
                      </figure>
                    </div>
                    <div className='custom-file'>
                      <input
                        type='file'
                        name='avatar'
                        className='custom-file-input'
                        id='customFile'
                        onChange={onChange}
                      />
                      <label className='custom-file-label' htmlFor='customFile'>
                        Choose Avatar
                      </label>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn update-btn btn-block mt-4 mb-3"
                  disabled={loading ? true : false}>Update</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default UpdateProfile
