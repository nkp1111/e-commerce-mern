import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,

  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,

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

    console.log("going to create order", order)
    const { data } = await axios.post("/api/v1/order/new", order, config)

    console.log("after creating order", data)
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

    console.log("allOrders", data)

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