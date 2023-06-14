import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector, useStore } from 'react-redux'

import MetaData from "../layout/MetaData";
import Loader from '../layout/loader'
import Sidebar from "./Sidebar"
import { getAdminProducts, clearErrors } from '../../actions/product'
import { getAllOrders } from '../../actions/order'

const Dashboard = () => {
  const dispatch = useDispatch()

  const { products } = useSelector(store => store.product)
  const { orders, totalAmount, loading } = useSelector(state => state.allOrder)

  let outOfStock = 0
  products.forEach(product => {
    if (product.stock < 1) {
      outOfStock += 1
    }
  })

  useEffect(() => {
    dispatch(getAdminProducts())
    dispatch(getAllOrders())
  }, [dispatch]);

  return (
    <>
      <MetaData title="Dashboard" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <h1 className="my-4">Dashboard</h1>
          <div className="row ps-4">
            <div className="col-xl-12 col-sm-12 mb-3">
              <div className="card text-white bg-primary o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount || 0}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row ps-4">
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-success o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">Products<br /> <b>{products && products.length}</b></div>
                </div>
                <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                  <span className="float-start">View Details</span>
                  <span className="float-end">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>


            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-danger o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div>
                </div>
                <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                  <span className="float-start">View Details</span>
                  <span className="float-end">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>


            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-info o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">Users<br /> <b>45</b></div>
                </div>
                <Link className="card-footer text-white clearfix small z-1" href="/admin/users">
                  <span className="float-start">View Details</span>
                  <span className="float-end">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>


            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-warning o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboard
