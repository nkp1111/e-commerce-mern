import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const ProtectedRoute = ({ children }) => {

  const { loading, isAuthenticated } = useSelector((state) => state.user)
  const navigate = useNavigate()

  if (!loading && !isAuthenticated) {
    toast.error("Please Login first to access resources.")
    navigate("/login")
  }

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute
