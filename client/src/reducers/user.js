const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  CLEAR_ERRORS,
} = require("../constants/user")

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      }

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      }

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}
