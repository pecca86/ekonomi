import {
  REGISTER_SUCCES,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./authTypes";
import axios from "axios";
import { setAlert } from "../alerts/alertActions";
import setAuthToken from "../../utils/setAuthToken";

// Load logged in user, checks if there is a logged in user
export const loadUser = () => async (dispatch) => {
  // check localStorage for token
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/v1/users/me");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Makes a call to the backend and tries to register the user
export const register =
  ({ firstname, lastname, email, password }) =>
  async (dispatch) => {
    const formData = {
      firstname,
      lastname,
      email,
      password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const body = JSON.stringify(formData);

    try {
      const res = await axios.post("/api/v1/users", body, config);
      dispatch({
        type: REGISTER_SUCCES,
        payload: res.data,
      });

      dispatch(loadUser());
      dispatch(setAlert("Registration compeleted!", "success"));
    } catch (err) {
      dispatch(setAlert("Email Address already registered", "danger"));

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Log in user
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const formData = {
      email,
      password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const body = JSON.stringify(formData);

    try {
      const res = await axios.post("/api/v1/users/login", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
      dispatch(setAlert("Welcome back!", "success"));
    } catch (err) {
      const errors = err.response.data.error;

      dispatch(setAlert(errors, "danger"));

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

// Log out user
export const logout = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/users/logout");

    dispatch({
      type: LOGOUT_SUCCESS,
    });
    dispatch(setAlert("Log out successful!", "success"));
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "danger"));
  }
};
