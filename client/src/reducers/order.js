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

  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,

  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_RESET,

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


export const allOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }


    case ALL_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
        totalAmount: action.payload.totalPrice,
        loading: false,
      }

    case ALL_ORDER_FAIL:
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


export const orderChangeReducer = (state = {}, action) => {
  switch (action.type) {
    // case DELETE_ORDER_REQUEST:
    case UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      }

    // case DELETE_ORDER_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     isDeleted: action.payload,
    //   }

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      }

    // case DELETE_ORDER_FAIL:
    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    // case DELETE_ORDER_RESET:
    //   return {
    //     ...state,
    //     isDeleted: false,
    //   }

    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default:
      return state;
  }
}
