import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk"

import {
  productReducer, productDetailReducer,
  userReducer, userProfileReducer, forgotPasswordReducer,
} from './reducers'

const reducer = combineReducers({
  product: productReducer,
  productDetail: productDetailReducer,
  user: userReducer,
  userProfile: userProfileReducer,
  forgotPassword: forgotPasswordReducer,
})

const initialState = {}

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: [thunk],
})

export default store