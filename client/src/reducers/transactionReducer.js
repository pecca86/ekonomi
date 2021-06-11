import {
  CREATE_TRANSACTION,
  GET_TRANSACTIONS,
  SET_LOADING,
  DELETE_TRANSACTION,
  SET_TIMEINTERVALL,
  //GET_TIMEINTERVALLS,
  SET_QUERIES,
} from "../actions/transaction/transactionTypes";

const initialState = {
  transactions: [],
  timeintervalTransactions: [],
  transactionQueries: [],
  transaction: null,
  loading: true,
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
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case SET_TIMEINTERVALL:
      return {
        ...state,
        timeintervalTransactions: [
          ...state.timeintervalTransactions,
          action.payload,
        ],
      };
    case SET_QUERIES:
      return {
        ...state,
        transactionQueries: [...action.payload],
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
