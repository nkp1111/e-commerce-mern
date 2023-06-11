import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast'

import Loader from "../layout/loader"

import MetaData from '../layout/MetaData'
import { getOrderDetails, clearErrors } from "../../actions/order";

const DetailOrder = () => {

  const { id } = useParams()

  const dispatch = useDispatch()

  const { error, order, loading } = useSelector(state => state.orderDetail)


  useEffect(() => {

    dispatch(getOrderDetails(id))

    if (error) {
      toast.error(error)
      dispatch(clearErrors())
      return
    }
  }, [dispatch, error, id]);

  if (!order) {
    return <Loader />
  }

  const { shippingInfo, orderItems, paymentInfo, totalPrice, shippingPrice, taxPrice, orderStatus, itemsPrice, user } = order

  const shippingAddress = shippingInfo && `${shippingInfo.address} ${shippingInfo.city} ${shippingInfo.country} ${shippingInfo.postalCode}`

  const isPaid = paymentInfo && paymentInfo.status === "succeeded"

  return (
    <>
      <MetaData title="Order Details" />
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-details">

          <h1 className="my-5">Order # 4543f34f545</h1>

          <h4 className="mb-4">Shipping Info</h4>
          <p><b>Name: </b>{user && user.name}</p>
          <p><b>Phone: </b>{shippingInfo.phoneNo}</p>
          <p className="mb-4"><b>Address: </b>{shippingAddress}</p>
          <p><b>Amount: </b> ${totalPrice}</p>

          <hr />

          <h4 className="my-4">Payment</h4>
          <p className={isPaid ? "greenColor" : "redColor"} ><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>


          <h4 className="my-4">Order Status:</h4>
          <p className={order.orderStatus && String(order.orderStatus).includes("Delivered") ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>


          <h4 className="my-4">Order Items: </h4>

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
      </div>
    </>
  )
}

export default DetailOrder
