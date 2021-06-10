import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";
import transactionReducer from "./transactionReducer";

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  account: accountReducer,
  transaction: transactionReducer,
});
