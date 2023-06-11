import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,

  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_SUCCESS,

  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,

  CLEAR_ERRORS,
} from '../constants/product'

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: []
      }

    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productCount: action.payload.totalCount,
        resPerPage: action.payload.resPerPage,
      }

    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }

    default:
      return state;
  }
}

export const productDetailReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return {
        loading: true,
        products: []
      }

    case PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      }

    case PRODUCT_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state;
  }
}


export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case NEW_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      }

    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }

    default:
      return state;
  }
}