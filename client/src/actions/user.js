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

  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,

  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,

  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,

  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,

  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_FAIL,

  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,

  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,

  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,

  LOGOUT_SUCCESS,
  LOGOUT_FAIL,

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
      payload: error.response.data.message,
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
      payload: error.response.data.message,
    })
  }
}


// update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.put(
      "/api/v1/me/update",
      userData,
      config,
    )

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success })

  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    })
  }
}

// update password
export const updatePassword = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.put(
      "/api/v1/password/update",
      userData,
      config,
    )

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success })

  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    })
  }
}


// forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(
      "/api/v1/password/forgot",
      email,
      config,
    )

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message
    })

  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    })
  }
}

// reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: PASSWORD_RESET_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(
      "/api/v1/password/reset/" + token,
      passwords,
      config,
    )

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
      payload: data.success
    })

  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
      payload: error.response.data.message,
    })
  }
}

// get current user 
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST })

    const { data } = await axios.get("/api/v1/me")

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })

  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// logout current user
export const logout = () => async (dispatch) => {
  try {

    await axios.post("/api/v1/user/logout")
    dispatch({ type: LOGOUT_SUCCESS })

  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message
    })
  }
}

export const clearErrors = async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}


export const allUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST })

    const { data } = await axios.get("/api/v1/admin/users")

    dispatch({ type: ALL_USER_SUCCESS, payload: data })

  } catch (error) {
    dispatch({
      type: ALL_USER_FAIL,
      payload: error.response.data.message,
    })
  }
}


export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.put(
      "/api/v1/admin/user/" + id,
      userData,
      config,
    )

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    })

  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    })
  }
}


export const getUserDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAIL_REQUEST })

    const { data } = await axios.get("/api/v1/admin/user/" + id)

    dispatch({ type: USER_DETAIL_SUCCESS, payload: data.user })

  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload: error.response.data.message,
    })
  }
}


export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST })

    const { data } = await axios.delete("/api/v1/admin/user/" + id)

    dispatch({ type: USER_DELETE_SUCCESS, payload: data.success })

  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response.data.message,
    })
  }
}