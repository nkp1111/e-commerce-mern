import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import { CardCvcElement, useStripe, useElements, CardNumberElement, CardExpiryElement } from "@stripe/react-stripe-js"
import axios from 'axios'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'


const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    }
  }
}


const Payment = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const elements = useElements()
  const stripe = useStripe()

  const { user } = useSelector(state => state.user)
  const { cartItems, shippingInfo } = useSelector(state => state.cart)


  const orderInfo = JSON.parse(localStorage.getItem("orderInfo"))

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const payBtn = document.getElementById("pay_btn")
    payBtn.disabled = true

    let res

    try {

      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      }

      res = await axios.post("/api/v1/payment/process", paymentData, config)

      if (!stripe || !elements) {
        return
      }

      const clientSecret = res.data.client_secret

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          }
        }
      })

      if (result.error) {
        toast.error(result.error.message)
        payBtn.disabled = false
      } else {
        if (result.paymentIntent.state === "succeeded") {


          navigate("/success")
        } else {
          toast.error("There is some issue processing payment")
          payBtn.disabled = false
        }
      }



    } catch (error) {
      payBtn.disabled = false
      console.log(error)
      toast.error(error)
    }
  }

  return (
    <>
      <MetaData title="Payment" />

      <CheckoutSteps shipping={true} confirmOrder={true} payment={true} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>


            <button
              id="pay_btn"
              type="submit"
              className="btn w-100 py-3"
            >
              Pay - {orderInfo && orderInfo.totalPrice}
            </button>

          </form>
        </div>
      </div>
    </>
  )
}

export default Payment
