import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
// import toast from 'react-hot-toast'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

const ConfirmOrder = () => {
  const navigate = useNavigate()
  const { cartItems, shippingInfo } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.user)

  const itemPrice = cartItems?.reduce((acc, item) => acc + (item.quantity * item.price), 0)
  const shippingPrice = itemPrice > 250 ? 0 : 25
  const taxPercent = 10
  const taxPrice = Number((taxPercent * itemPrice / 100).toFixed(2))
  const totalPrice = itemPrice + shippingPrice + taxPrice


  const proceedToPayment = () => {
    const data = {
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    }

    localStorage.setItem("orderInfo", JSON.stringify(data))

    navigate("/")
  }

  return (
    <>
      <MetaData title="Confirm Order" />

      <CheckoutSteps confirmOrder={true} />
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">

          <h4 className="mb-3">Shipping Info</h4>
          <p><b>Name:</b>{user && user.name}</p>
          <p><b>Phone:</b>{shippingInfo && shippingInfo.phoneNo}</p>
          <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.country}</p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

          {cartItems && cartItems.map(item => (
            <React.Fragment key={item.product}>
              <hr />
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt={item.name} height="45" width="65" />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link href={`/product/${item.product}`}>{item.name}</Link>
                  </div>


                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>{item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b></p>
                  </div>

                </div>
              </div>
            </React.Fragment>
          ))}
          <hr />

        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>Subtotal:  <span className="order-summary-values">${itemPrice}</span></p>
            <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
            <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

            <hr />

            <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

            <hr />
            <button id="checkout_btn" className="btn btn-primary w-100"
              onClick={proceedToPayment}>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmOrder
