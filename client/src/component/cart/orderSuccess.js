import React from 'react'
import { Link } from "react-router-dom"

import MetaData from "../layout/MetaData"


const orderSuccess = () => {
  return (
    <>
      <MetaData title="Orders Success" />

      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <img src="https://freepngimg.com/thumb/success/6-2-success-png-image.png" alt="order success" className="img-fluid my-5 d-block mx-auto" width="200" height="200" />

          <h2>Your order has been placed successfully.</h2>

          <Link to="/orders/me">Go to Orders</Link>
        </div>
      </div>
    </>
  )
}

export default orderSuccess
