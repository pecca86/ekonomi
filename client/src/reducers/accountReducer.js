import {
  GET_ACCOUNTS,
  GET_ACCOUNT,
  UPDATE_ACCOUNT,
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  DELETE_TIMEINTERVALL,
  ACCOUNT_ERROR,
  SET_LOADING,
} from "../actions/account/accountTypes";

const initialState = {
  accounts: null,
  account: null,
  loading: true,
  error: null
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
        loading: false
      };
    case GET_ACCOUNT:
      return "";
    case UPDATE_ACCOUNT:
      return "";
    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
        loading: false
      };
    case DELETE_ACCOUNT:
      return "";
    case DELETE_TIMEINTERVALL:
      return "";
    case ACCOUNT_ERROR:
      return "";
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
