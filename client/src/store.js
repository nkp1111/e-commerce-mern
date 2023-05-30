import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk"

import { productReducer } from './reducers'

const reducer = combineReducers({
  product: productReducer,
})

const initialState = {}

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: [thunk],
})

export default store