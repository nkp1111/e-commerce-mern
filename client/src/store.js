import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk"

import {
  productReducer, productDetailReducer,
  userReducer,
} from './reducers'

const reducer = combineReducers({
  product: productReducer,
  productDetail: productDetailReducer,
  user: userReducer,
})

const initialState = {}

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: [thunk],
})

export default store