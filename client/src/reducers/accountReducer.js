import {
  GET_ACCOUNTS,
  GET_ACCOUNT,
  UPDATE_ACCOUNT,
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  DELETE_TIMEINTERVALL,
  ACCOUNT_ERROR,
} from "../actions/account/accountTypes";

const initialState = {
  accounts: [],
  account: null,
  error: {},
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return {
          ...state,
          accounts: action.payload
      };
    case GET_ACCOUNT:
      return "";
    case UPDATE_ACCOUNT:
      return "";
    case ADD_ACCOUNT:
      return {
          ...state,
          accounts: [action.payload, ...state.accounts]
      };
    case DELETE_ACCOUNT:
      return "";
    case DELETE_TIMEINTERVALL:
      return "";
    case ACCOUNT_ERROR:
      return "";
    default:
      return state;
  }
}
