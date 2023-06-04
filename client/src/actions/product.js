import axios from 'axios'

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/product'

export const getAllProducts = (keyword = "", currentPage = 1, price) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCT_REQUEST,
    })

    const link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`
    const { data } = await axios.get(link)

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.message
    })
  }
}

export const clearErrors = async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}


export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAIL_REQUEST,
    })

    const { data } = await axios.get("/api/v1/product/" + id)

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data.product
    })

  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error.message
    })
  }
}