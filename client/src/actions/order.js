import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,

  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,

  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,

  CLEAR_ERROR,
} from '../constants/order'
import axios from 'axios'

export const createOrder = (order) => async (dispatch) => {
  try {

    dispatch({
      type: CREATE_ORDER_REQUEST
    })

    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }

    const { data } = await axios.post("/api/v1/order/new", order, config)

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data.order,
    })

  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    })
  }
}


export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  })
}


export const getMyOrders = () => async (dispatch) => {
  try {

    dispatch({
      type: MY_ORDER_REQUEST
    })

    const { data } = await axios.get("/api/v1/order/me")

    dispatch({
      type: MY_ORDER_SUCCESS,
      payload: data.orders,
    })

  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
    })
  }
}


export const getOrderDetails = (id) => async (dispatch) => {
  try {

    dispatch({
      type: ORDER_DETAIL_REQUEST,
    })

    const { data } = await axios.get("/api/v1/order/" + id)

    dispatch({
      type: ORDER_DETAIL_SUCCESS,
      payload: data.order,
    })

  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_FAIL,
      payload: error.response.data.message
    })
  }
}