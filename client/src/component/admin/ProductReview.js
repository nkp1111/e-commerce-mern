import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { MDBDataTable } from "mdbreact"

import MetaData from "../layout/MetaData";
import Loader from '../layout/loader'
import Sidebar from "./Sidebar"
import { clearErrors, getProductReviews } from '../../actions/product'
import { GET_REVIEW_RESET } from '../../constants/product'

const ProductReview = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [productId, setProductId] = useState("");
  // const { loading, error, users } = useSelector(state => state.allUser)
  // const { error: deleteError, isDeleted } = useSelector(state => state.userProfile)
  const { error, reviews, loading } = useSelector(state => state.productReview)

  useEffect(() => {

    if (error) {
      toast.error(error)
      dispatch(clearErrors())
      return
    }

    if (productId !== "") {
      dispatch(getProductReviews(productId))
    }

    // if (isDeleted) {
    //   toast.success("Successfully deleted user")
    //   navigate("/admin/users")
    //   dispatch({
    //     type: GET_REVIEW_RESET
    //   })
    // }
  }, [dispatch, error, navigate, productId]);

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(getProductReviews(productId))
  }

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc"
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc"
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc"
        },
        {
          label: "User",
          field: "user",
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

    reviews.forEach(review => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,
        actions: <>
          <button className="btn btn-danger py-1 px-2 ms-2" disabled={loading}
          // onClick={() => deleteUserHandler(review._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      })
    })

    return data
  }


  // const deleteUserHandler = (id) => {
  //   dispatch(deleteUser(id))
  // }

  return (
    <>
      <MetaData title="Product Reviews" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
            <div className="row justify-content-center mt-5">
              <div className="col-5">
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="productId_field">Enter Product ID</label>
                    <input
                      type="text"
                      id="productId_field"
                      className="form-control"
                      value={productId}
                      onChange={e => setProductId(e.target.value)}
                    />
                  </div>

                  <button
                    id="search_button"
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                  >
                    SEARCH
                  </button>
                </ form>
              </div>

            </div>



            <h1 className='my-5'>Product Reviews</h1>
            {reviews?.length > 0 ? (
              <>
                <MDBDataTable
                  data={setReviews()}
                  className='px-3'
                  bordered
                  striped
                  hover />
              </>
            ) : <p className='mt-5 text-center'>No reviews to show</p>}
          </>
        </div>
      </div>
    </>
  )
}

export default ProductReview
