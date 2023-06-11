import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { clearErrors, getProductDetails } from '../../actions/product'
import Loader from '../layout/loader'
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast'
import { Carousel } from 'react-bootstrap'
import MetaData from '../layout/MetaData'

import { addItemsToCart } from "../../actions/cart";
import { createNewReviews } from '../../actions/product'
import { NEW_REVIEW_RESET } from '../../constants/product'
import ListReview from '../review/ListReview'

const Detail = () => {

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams()

  const { error, product } = useSelector(store => store.productDetail)
  const { user } = useSelector(store => store.user)
  const { error: reviewError, success } = useSelector(store => store.newReview)

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getProductDetails(id))

    if (error) {
      toast.error(`Error: ${error}`)
      dispatch(clearErrors())
      return
    }

    if (reviewError) {
      toast.error(reviewError)
      dispatch(clearErrors())
      return;
    }

    if (success) {
      toast.success("New Review posted")
      dispatch({
        type: NEW_REVIEW_RESET
      })
    }

  }, [dispatch, error, id, reviewError, success]);

  const addToCart = () => {
    dispatch(addItemsToCart(id, quantity))
    toast.success("Item added to cart")
  }

  const increaseQty = () => {
    const count = document.querySelector(".count")
    if (Number(count.value) >= product.quantity) return

    const newQty = Number(count.value) + 1
    setQuantity(newQty)
  }

  const decreaseQty = () => {
    const count = document.querySelector(".count")
    if (Number(count.value) <= 1) return

    const newQty = Number(count.value) - 1
    setQuantity(newQty)
  }


  const setUserRatings = () => {
    const stars = document.querySelectorAll(".star")

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["mouseover", "click", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings)
      })
    })


    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            setRating(this.starValue)
            star.classList.add("orange")
          } else {
            star.classList.remove("orange")
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow")
          } else {
            star.classList.remove("yellow")
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow")
        }
      })
    }
  }


  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append("comment", comment)
    formData.append("rating", rating)

    dispatch(createNewReviews(formData, id))
  }

  return (
    <>
      {!product ? <Loader /> : (
        <>
          <MetaData title={product.name} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {product?.images && product?.images.map(image => (
                  <Carousel.Item key={image._id}>
                    <img className="d-block w-100" src={image.url} alt={product?.name} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>

              <hr />

              <div className="rating-outer">
                <div className="rating-inner"
                  style={{ width: `${product.ratings / 5 * 100}%` }}></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

              <hr />

              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
              </div>
              <button type="button" id="cart_btn" className="btn btn-primary d-inline ms-4"
                disabled={product.stock === 0} onClick={addToCart}>Add to Cart</button>

              <hr />

              <p>Status: <span id="stock_status"
                className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span></p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

              {user ? (
                <button id="review_btn" type="button" className="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#ratingModal" onClick={setUserRatings}>
                  Submit Your Review
                </button>
              ) : (
                <div className="alert alert-danger mt-5">
                  Login to post your reviews
                </div>
              )}

              <div className="row mt-2 mb-5">
                <div className="rating w-50">

                  <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                          <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">

                          <ul className="stars" >
                            <li className="star"><i className="fa fa-star"></i></li>
                            <li className="star"><i className="fa fa-star"></i></li>
                            <li className="star"><i className="fa fa-star"></i></li>
                            <li className="star"><i className="fa fa-star"></i></li>
                            <li className="star"><i className="fa fa-star"></i></li>
                          </ul>

                          <textarea name="review" id="review" className="form-control mt-3" onChange={e => setComment(e.target.value)} value={comment}>

                          </textarea>

                          <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close"
                            onClick={reviewSubmitHandler}>Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {product.reviews && <ListReview reviews={product.reviews} />}
        </>
      )}
    </>
  )
}

export default Detail
