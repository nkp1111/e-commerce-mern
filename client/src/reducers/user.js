const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,

  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,

  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,

  LOGOUT_SUCCESS,
  LOGOUT_FAIL,

  CLEAR_ERRORS,
} = require("../constants/user")

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      }

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      }

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      }

    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: false,
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


export const userProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {

    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUploaded: action.payload,
      }

    case UPDATE_PROFILE_RESET:
      return {
        ...state,
        isUploaded: false,
      }

    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
      return state
  }
}