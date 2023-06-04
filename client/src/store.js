import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk"

import { productReducer, productDetailReducer } from './reducers'

const reducer = combineReducers({
  product: productReducer,
  productDetail: productDetailReducer,
})

const initialState = {}

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: [thunk],
})

export default store