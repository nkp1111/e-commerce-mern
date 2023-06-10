import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from '../constants/cart'
import axios from 'axios'

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`)

  dispatch({
    type: ADD_TO_CART,
    payload: {
      quantity,
      product: id,
      name: data.product.name,
      stock: data.product.stock,
      price: data.product.price,
      image: data.product?.images[0].url,
    }
  })

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}


export const removeCartItem = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  })

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}


export const saveShippingInfo = (info) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: info,
  })

  localStorage.setItem("shippingInfo", JSON.stringify(info))
}