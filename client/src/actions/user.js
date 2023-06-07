import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,

  CLEAR_ERRORS,
} from "../constants/user"
import axios from 'axios'


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(
      "/api/v1/user/login",
      { email, password },
      config,
    )

    dispatch({ type: LOGIN_SUCCESS, payload: data.user })

  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    })
  }
}


export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(
      "/api/v1/user/register",
      userData,
      config,
    )

    dispatch({ type: REGISTER_SUCCESS, payload: data.user })

  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.message,
    })
  }
}


export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST })

    const { data } = await axios.get("/api/v1/me")

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })

  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.message,
    })
  }
}

export const clearErrors = async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}