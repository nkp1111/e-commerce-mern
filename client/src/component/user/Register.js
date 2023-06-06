import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";

import Loader from '../layout/loader'
import MetaData from '../layout/MetaData'

import { register, clearErrors } from '../../actions/user'


const Register = () => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = user

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("https://source.unsplash.com/random/?avatar");

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.user)
  const { loading, error, isAuthenticated } = userRegister

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors)
      return
    }

    if (isAuthenticated) {
      navigate("/")
    }

  }, [dispatch, error, isAuthenticated, navigate]);

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("image", avatar)
    dispatch(register(formData))
  }


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
    } else {
      setUser({ ...user, [name]: value })
    }
  }

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <MetaData title="Register" />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" encType='multipart/form-data'
                onSubmit={submitHandler}>
                <h1 className="mb-3">Register</h1>

                <div className="form-group">
                  <label htmlFor="email_field">Name</label>
                  <input type="name" id="name_field" className="form-control"
                    name="name"
                    value={name}
                    onChange={onChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChange}
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
                          alt='.'
                        />
                      </figure>
                    </div>
                    <div className='custom-file'>
                      <input
                        type='file'
                        name='avatar'
                        className='form-control custom-file-input'
                        id='customFile'
                        accept='images/*'
                        onChange={onChange}
                      />
                      <label className='form-label custom-file-label' htmlFor='customFile'>
                        Choose Avatar
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  id="register_button"
                  type="submit"
                  className="btn w-100 py-3"
                  disabled={loading ? true : false}
                >
                  REGISTER
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Register
