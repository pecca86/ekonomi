import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import accountReducer from './accountReducer'

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  account: accountReducer
});
