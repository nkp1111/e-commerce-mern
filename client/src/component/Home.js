import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllProducts } from "../actions/product";
import MetaData from './layout/MetaData'
import Product from "./product/product";
import Loader from './layout/loader'
import toast from 'react-hot-toast'
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom'

const Home = ({ match }) => {

  const { error, loading, products, productCount, resPerPage } = useSelector((state) => state.product)
  const [currentPage, setCurrentPage] = useState(1);

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
    dispatch(getAllProducts(keyword, currentPage))
  }, [currentPage, dispatch, error, keyword])

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
                {products?.map(product => {
                  return (
                    <Product product={product} key={product._id} />
                  )
                })}
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
