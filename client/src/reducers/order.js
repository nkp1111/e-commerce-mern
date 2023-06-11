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


export const newOrderReducer = (state = {}, action) => {

  switch (action.type) {

    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      }

    case CREATE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}


export const myOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case MY_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      }

    case MY_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}


export const orderDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        order: action.payload,
        loading: false,
      }

    case ORDER_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}