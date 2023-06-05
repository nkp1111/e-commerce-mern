import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllProducts } from "../actions/product";
import MetaData from './layout/MetaData'
import Product from "./product/product";
import Loader from './layout/loader'
import toast from 'react-hot-toast'
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const Home = () => {

  const { error, loading, products, productCount, resPerPage } = useSelector((state) => state.product)
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const categories = [
    "Electronics",
    "Furniture",
    "Clothing",
    "Books",
    "Music",
    "Sports",
    "Foods",
    "Beauty/Healthcare",
  ]

  const changeCurrentPageNum = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const { keyword } = useParams()

  const dispatch = useDispatch()
  useEffect(() => {
    if (error) {
      toast(`Error: ${error}`)
      return
    }
    dispatch(getAllProducts(keyword, currentPage, price, category, rating))
  }, [category, currentPage, dispatch, error, keyword, price, rating])

  return (
    <>
      {
        loading
          ? <Loader />
          : (<>
            <MetaData title="Buy Best Online Items" />
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
              <div className="row">
                {keyword
                  ? (
                    <>
                      <div className="col-6 col-md-3 my-5">
                        <div className="px-5">
                          <Slider range
                            marks={{ 1: `$1`, 1000: `$1000` }}
                            min={1}
                            max={1000}
                            defaultValue={[1, 1000]}
                            tipFormatter={(value) => `$${value}`}
                            tipProps={{ placement: "top", visible: true }}
                            value={price}
                            onChange={setPrice}
                          />

                          <hr className='my-5' />

                          <div className="mt-5">
                            <h4 className="mb-3">Categories</h4>
                            <ul className="mx-0">
                              {categories.map(category => {
                                return (
                                  <li key={category} className="list-group-item"
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => setCategory(category)}>
                                    {category}
                                  </li>
                                )
                              })}
                            </ul>
                          </div>

                          <hr className='my-3' />

                          <div className="mt-5">
                            <h4 className="mb-3">Ratings</h4>
                            <ul className="mx-0">
                              {[5, 4, 3, 2, 1].map(rate => {
                                return (
                                  <li key={rate} className="list-group-item"
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => setRating(rate)}>
                                    <div className="rating-outer">
                                      <div className="rating-inner"
                                        style={{ width: `${rate / 5 * 100}%` }}></div>
                                    </div>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>

                        </div>
                      </div>

                      <div className="col-6 col-md-9">
                        <div className="row">
                          {products?.map(product => {
                            return (
                              <Product product={product} key={product._id} col={4} />
                            )
                          })}
                        </div>
                      </div>
                    </>
                  )
                  : (
                    <>
                      {products?.map(product => {
                        return (
                          <Product product={product} key={product._id} col={3} />
                        )
                      })}
                    </>
                  )}

              </div>
            </section>

            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productCount}
                pageRangeDisplayed={5}
                onChange={changeCurrentPageNum}
                prevPageText={"Prev"}
                nextPageText={"Next"}
                lastPageText={"Last"}
                firstPageText={"First"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </>)
      }
    </>
  )
}

export default Home
