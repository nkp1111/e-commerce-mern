import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import toast from 'react-hot-toast'

import MetaData from '../layout/MetaData'
import { addItemsToCart, removeCartItem } from "../../actions/cart";

const Cart = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)

  const increaseQty = (item) => {
    const { quantity, stock, product: id } = item
    const newQty = quantity + 1

    if (newQty > stock) return

    dispatch(addItemsToCart(id, newQty))
  }

  const decreaseQty = (item) => {
    const { quantity, product: id } = item
    const newQty = quantity - 1

    if (newQty <= 0) return

    dispatch(addItemsToCart(id, newQty))
  }

  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id))
    toast.success("Cart item removed")
  }

  return (
    <>
      <MetaData title="Cart" />
      {cartItems.length === 0
        ? <h2 className='mt-5 text-center'>Your Cart is empty</h2>
        : (
          <>
            <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>

            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8">

                {cartItems.map(item => (
                  <React.Fragment key={item.product}>
                    <hr />
                    <div className="cart-item">
                      <div className="row">
                        <div className="col-4 col-lg-3">
                          <img src={item.image} alt={item.name} height="90" width="115" />
                        </div>

                        <div className="col-5 col-lg-3">
                          <Link to={`/product/${item.product}`} >{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p id="card_item_price">${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus" onClick={(e) => decreaseQty(item)}>-</span>
                            <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                            <span className="btn btn-primary plus" onClick={(e) => increaseQty(item)}>+</span>
                          </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0" onClick={() => removeCartItemHandler(item.product)}>
                          <i id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
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
                  <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} (Units)</span></p>
                  <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</span></p>

                  <hr />
                  <button id="checkout_btn" className="btn btn-primary btn-block">Check out</button>
                </div>
              </div>
            </div>
          </>
        )}
    </>
  )
}

export default Cart
