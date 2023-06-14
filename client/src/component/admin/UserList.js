import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { MDBDataTable } from "mdbreact"

import MetaData from "../layout/MetaData";
import Loader from '../layout/loader'
import Sidebar from "./Sidebar"
import { clearErrors, allUsers, deleteUser } from '../../actions/user'
import { USER_DELETE_RESET } from '../../constants/user'

const UserList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, users } = useSelector(state => state.allUser)
  const { error: deleteError, isDeleted } = useSelector(state => state.userProfile)

  useEffect(() => {
    dispatch(allUsers())

    if (error) {
      toast.error(error)
      dispatch(clearErrors())
      return
    }

    if (deleteError) {
      toast.error(deleteError)
      dispatch(clearErrors())
      return
    }

    if (isDeleted) {
      toast.success("Successfully deleted user")
      navigate("/admin/users")
      dispatch({
        type: USER_DELETE_RESET
      })
    }
  }, [deleteError, dispatch, error, isDeleted, navigate]);

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc"
        },
        {
          label: "Name",
          field: "name",
          sort: "asc"
        },
        {
          label: "Email",
          field: "email",
          sort: "asc"
        },
        {
          label: "Role",
          field: "role",
          sort: "asc"
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc"
        },
      ],
      rows: [],
    }

    users.forEach(user => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: <>
          <Link to={`/admin/user/${user._id}`} className='btn btn-primary py-1 px-2'>
            <i className="fa fa-pencil"></i>
          </Link>
          <button className="btn btn-danger py-1 px-2 ms-2" disabled={loading}
            onClick={() => deleteUserHandler(user._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      })
    })

    return data
  }


  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
  }

  return (
    <>
      <MetaData title="All Users" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
            <h1 className='my-5'>All Users</h1>
            {loading ? <Loader /> : (
              <>
                <MDBDataTable
                  data={setUsers()}
                  className='px-3'
                  bordered
                  striped
                  hover />
              </>
            )}
          </>
        </div>
      </div>
    </>
  )
}

export default UserList

