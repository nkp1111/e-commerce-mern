import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk"

import {
  productReducer, productDetailReducer, newReviewReducer, newProductReducer,
  userReducer, userProfileReducer, forgotPasswordReducer,
  cartReducer,
  newOrderReducer, myOrderReducer, orderDetailReducer,
} from './reducers'

const reducer = combineReducers({
  product: productReducer,
  productDetail: productDetailReducer,
  user: userReducer,
  userProfile: userProfileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  order: newOrderReducer,
  myOrders: myOrderReducer,
  orderDetail: orderDetailReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
})

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  }
}

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: [thunk],
})

export default store