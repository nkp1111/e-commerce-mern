import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const ProtectedRoute = ({ children, isAdmin }) => {

  const { loading, isAuthenticated, user } = useSelector((state) => state.user)
  const navigate = useNavigate()

  if (!loading && !isAuthenticated) {
    toast.error("Please Login first to access resources.")
    navigate("/login")
  }

  if (isAdmin && user && user.roles !== "admin") {
    navigate("/")
  }

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute
