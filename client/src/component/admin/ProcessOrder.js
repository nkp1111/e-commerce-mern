import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

import MetaData from "../layout/MetaData";
import Loader from '../layout/loader'
import Sidebar from "./Sidebar"
import { clearErrors, updateOrder, getOrderDetails } from '../../actions/order'
import { UPDATE_ORDER_RESET } from '../../constants/order'


const ProcessOrder = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [status, setStatus] = useState("");

  const { loading, order = {} } = useSelector(state => state.orderDetail)
  const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
  const { error, isUpdated } = useSelector(state => state.order)

  useEffect(() => {
    dispatch(getOrderDetails(id))
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
      return
    }
    if (isUpdated) {
      toast.success("Successfully updated order")
      dispatch({
        type: UPDATE_ORDER_RESET
      })
    }
  }, [dispatch, error, id, isUpdated, navigate]);

  const processOrderHandler = (id) => {
    const formData = new FormData()
    formData.set("status", status)

    dispatch(updateOrder(id, formData))
  }

  const shippingDetail = shippingInfo && `${shippingInfo.address} ${shippingInfo.city} ${shippingInfo.postalCode} ${shippingInfo.country}`

  const isPaid = shippingInfo && shippingInfo.status === "succeeded"

  return (
    <>
      <MetaData title={`Process Order #${order?._id}`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
            <h1 className='my-5'>All Orders</h1>
            {loading ? <Loader /> : (
              <>
                <div className="row d-flex justify-content-around">
                  <div className="col-12 col-lg-7 order-details">

                    <h1 className="my-5">Order # ${order?._id}</h1>

                    <h4 className="mb-4">Shipping Info</h4>
                    <p><b>Name:</b> {user?.name}</p>
                    <p><b>Phone:</b>{shippingInfo?.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b>{shippingDetail}</p>
                    <p><b>Amount:</b> ${totalPrice || 0}</p>

                    <hr />

                    <h4 className="my-4">Payment</h4>
                    <p className={isPaid ? "greenColor" : "redColor"} ><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>

                    <h4 className="my-4">Stripe ID</h4>
                    <p><b>{paymentInfo?.id}</b></p>

                    <h4 className="my-4">Order Status:</h4>
                    <p className={orderStatus === "Delivered" ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>


                    <h4 className="my-4">Order Items:</h4>

                    {orderItems?.map(item => <React.Fragment key={item.product}>
                      <hr />
                      <div className="cart-item my-1">
                        <div className="row my-5">
                          <div className="col-4 col-lg-2">
                            <img src={item.image} alt={item.name} height="45" width="65" />
                          </div>

                          <div className="col-5 col-lg-5">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </div>


                          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p>${item.name}</p>
                          </div>

                          <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <p>{item.quantity} Piece(s)</p>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>)}
                    <hr />
                  </div>

                  <div className="col-12 col-lg-3 mt-5">
                    <h4 className="my-4">Status</h4>

                    <div className="form-group">
                      <select
                        className="form-control"
                        name='status'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>

                    <button className="btn btn-primary w-100" onClick={() => processOrderHandler(order._id)}>
                      Update Status
                    </button>
                  </div>

                </div>
              </>
            )}
          </>
        </div>
      </div>
    </>
  )
}

export default ProcessOrder
