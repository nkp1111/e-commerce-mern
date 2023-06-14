import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { MDBDataTable } from "mdbreact"


import MetaData from "../layout/MetaData";
import Loader from '../layout/loader'
import Sidebar from "./Sidebar"
import { getAdminProducts, clearErrors, deleteProduct } from '../../actions/product'
import { DELETE_PRODUCT_RESET } from '../../constants/product'

const ProductList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, products } = useSelector(state => state.product)
  const { isDeleted, error: deleteError } = useSelector(state => state.productChange)

  useEffect(() => {
    dispatch(getAdminProducts())

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
      toast.success("Successfully deleted product")
      navigate("/admin/products")
      dispatch({
        type: DELETE_PRODUCT_RESET
      })
    }
  }, [deleteError, dispatch, error, isDeleted, navigate]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc"
        },
        {
          label: "Name",
          field: "name",
          sort: "asc"
        },
        {
          label: "Price",
          field: "price",
          sort: "asc"
        },
        {
          label: "Stock",
          field: "stock",
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


    products.forEach(product => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        actions: <>
          <Link to={`/admin/product/${product._id}`} className='btn btn-primary py-1 px-2'>
            <i className="fa fa-pencil"></i>
          </Link>
          <button className="btn btn-danger py-1 px-2 ms-2" onClick={() => productDeleteHandler(product._id)} disabled={loading}>
            <i className="fa fa-trash"></i>
          </button>
        </>
      })
    })

    return data
  }


  const productDeleteHandler = (id) => {
    dispatch(deleteProduct(id))
  }

  return (
    <>
      <MetaData title="All Products" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
            <h1 className='my-5'>All Products</h1>

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

export default ProductList
