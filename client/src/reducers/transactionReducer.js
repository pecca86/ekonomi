import {
  CREATE_TRANSACTION,
  GET_TRANSACTIONS,
  SET_LOADING,
  DELETE_TRANSACTION,
  SET_TIMEINTERVALL,
  //GET_TIMEINTERVALLS,
  GET_TIMESPANS,
  FLUSH_TIMEINTERVALLS,
  ADD_TIMESPAN,
  REMOVE_TIMESPAN,
  REMOVE_TIMEINTERVAL_TRANSACTION,
  SET_CURRENT_TRANSACTION,
  CLEAR_CURRENT_TRANSACTION,
  UPDATE_TRANSACTION,
} from "../actions/transaction/transactionTypes";

const initialState = {
  transactions: [],
  timeintervalTransactions: [],
  transactionQueries: [],
  transaction: null,
  loading: true,
  timeSpans: [],
  current: null,
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        loading: false,
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      };
    case REMOVE_TIMEINTERVAL_TRANSACTION:
      return {
        ...state,
        timeintervalTransactions: state.timeintervalTransactions.filter(
          (tit) => tit.timeSpan._id !== action.payload
        ),
        loading: false
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
        loading: false
      };
    case UPDATE_TRANSACTION:
      console.log("ACTION PAYLOAD: ", action.payload);
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction._id === action.payload._id ? action.payload : transaction
        ),
        loading: false
      };
    case SET_CURRENT_TRANSACTION:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT_TRANSACTION:
      return {
        ...state,
        current: null,
      };
    case REMOVE_TIMESPAN:
      return {
        ...state,
        timeSpans: state.timeSpans.filter(
          (timespan) => timespan._id !== action.payload
        ),
      };
    case GET_TIMESPANS:
      return {
        ...state,
        timeSpans: action.payload,
        loading: false,
      };
    case ADD_TIMESPAN:
      return {
        ...state,
        timeSpans: [...state.timeSpans, action.payload],
        loading: false,
      };
    case SET_TIMEINTERVALL:
      return {
        ...state,
        timeintervalTransactions: [
          ...state.timeintervalTransactions,
          action.payload,
        ],
        loading: false,
      };
    case FLUSH_TIMEINTERVALLS:
      return {
        ...state,
        timeintervalTransactions: [],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
