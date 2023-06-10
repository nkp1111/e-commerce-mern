import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,

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