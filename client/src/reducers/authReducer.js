import {
  REGISTER_SUCCES,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  UPDATE_USER,
  UPDATE_PASSWORD,
  SET_LOADING,
} from "../actions/auth/authTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCES:
    case LOGIN_SUCCESS:
    case UPDATE_PASSWORD:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: true,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
