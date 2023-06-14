import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { MDBDataTable } from "mdbreact"

import MetaData from "../layout/MetaData";
import Loader from '../layout/loader'
import Sidebar from "./Sidebar"
import { clearErrors, deleteOrder, getAllOrders } from '../../actions/order'
import { DELETE_ORDER_RESET } from '../../constants/order'

const OrderList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, orders, totalAmount } = useSelector(state => state.allOrder)
  const { error: orderError, isDeleted } = useSelector(state => state.orderChange)

  useEffect(() => {
    dispatch(getAllOrders())

    if (error) {
      toast.error(error)
      dispatch(clearErrors())
      return
    }

    if (isDeleted) {
      toast.success("Successfully deleted order")
      navigate("/admin/orders")
      dispatch({
        type: DELETE_ORDER_RESET
      })
    }
  }, [dispatch, error, isDeleted, navigate]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc"
        },
        {
          label: "No of Items",
          field: "numOfItems",
          sort: "asc"
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc"
        },
        {
          label: "Status",
          field: "status",
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

    orders.forEach(order => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: order.totalPrice,
        status: order.orderStatus && order.orderStatus.includes("Delivered")
          ? <p style={{ color: "green" }}>{order.orderStatus}</p>
          : <p style={{ color: "red" }}>{order.orderStatus}</p>,
        actions: <>
          <Link to={`/admin/order/${order._id}`} className='btn btn-primary py-1 px-2'>
            <i className="fa fa-eye"></i>
          </Link>
          <button className="btn btn-danger py-1 px-2 ms-2" disabled={loading} onClick={() => deleteOrderHandler(order._id)}>
            <i className="fa fa-trash"></i>
          </button>
        </>
      })
    })

    return data
  }


  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
  }

  return (
    <>
      <MetaData title="All Orders" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
            <h1 className='my-5'>All Orders</h1>
            {loading ? <Loader /> : (
              <>
                <MDBDataTable
                  data={setOrders()}
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

export default OrderList

