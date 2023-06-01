import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllProducts } from "../actions/product";
import MetaData from './layout/MetaData'
import Product from "./product/product";
import Loader from './layout/loader'
import toast from 'react-hot-toast'

const Home = () => {

  const { error, loading, products, productCount } = useSelector((state) => state.product)

  const dispatch = useDispatch()
  useEffect(() => {
    if (error) {
      toast(`Error: ${error}`)
      return
    }
    dispatch(getAllProducts)
  }, [dispatch, error])

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
          </>)
      }
    </>
  )
}

export default Home
