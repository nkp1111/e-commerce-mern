import axios from 'axios'

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,

  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_SUCCESS,

  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,

  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,

  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,

  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,

  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,

  CLEAR_ERRORS,
} from '../constants/product'

export const getAllProducts = (keyword = "", currentPage = 1, price, category, rating) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCT_REQUEST,
    })

    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`

    if (category) {
      link += `&category=${category}`
    }
    const { data } = await axios.get(link)

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const clearErrors = () => async (dispatch) => {
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
      payload: error.response.data.message,
    })
  }
}

export const createNewReviews = (reviewData, productId) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    })

    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }

    const { data } = await axios.post(`/api/v1/product/${productId}/review`, reviewData, config)

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success
    })

  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    })
  }
}


export const getAdminProducts = () => async (dispatch) => {
  try {

    dispatch({
      type: ADMIN_PRODUCT_REQUEST
    })

    const { data } = await axios.get("/api/v1/admin/products")

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products
    })

  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}


export const createNewProduct = (product) => async (dispatch) => {
  try {

    dispatch({
      type: NEW_PRODUCT_REQUEST,
    })

    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }

    const { data } = await axios.post("/api/v1/admin/product/new", product, config)

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}


export const deleteProduct = (id) => async (dispatch) => {
  try {

    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    })

    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }

    const { data } = await axios.delete("/api/v1/admin/product/" + id, config)

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    })

  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message
    })
  }
}


export const updateProduct = (id, productData) => async (dispatch) => {
  try {

    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
    })

    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }

    const { data } = await axios.put("/api/v1/admin/product/" + id, productData, config)

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    })

  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message
    })
  }
}