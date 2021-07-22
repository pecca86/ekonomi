import { LOCATION_CHANGE } from "react-router-redux";
import {
  CREATE_TRANSACTION,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_BY_YEAR,
  CLEAR_TRANSACTIONS_BY_YEAR,
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
  SORT_TRANSACTIONS_ASC,
  SORT_TRANSACTIONS_DESC,
  SORT_TRANSACTIONS_BY_NAME,
  SET_CURRENT_TIMEINTERVAL,
  CLEAR_CURRENT_TIMEINTERVAL,
  UPDATE_TIMEINTERVAL,
  SORT_TIMEINTERVALS_ASC,
  GET_TRANSACTION_CATEGORIES,
  ADD_TRANSACTION_CATEGORY,
  DELETE_TRANSACTION_CATEGORY,
} from "../actions/transaction/transactionTypes";

const initialState = {
  transactions: [],
  transactionsByYear: [],
  timeintervalTransactions: [],
  transactionQueries: [],
  transaction: null,
  loading: false,
  timeSpans: [],
  current: null,
  currentTimeInterval: null,
  transactionCategories: [],
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        transactionsByYear: [],
      };
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
    case GET_TRANSACTIONS_BY_YEAR:
      return {
        ...state,
        transactionsByYear: [...state.transactionsByYear, action.payload],
        loading: false,
      };
    case CLEAR_TRANSACTIONS_BY_YEAR:
      return {
        ...state,
        transactionsByYear: [],
      };
    case REMOVE_TIMEINTERVAL_TRANSACTION:
      return {
        ...state,
        timeintervalTransactions: state.timeintervalTransactions.filter(
          (tit) => tit.timeSpan._id !== action.payload
        ),
        loading: false,
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
        loading: false,
      };
    case UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction._id === action.payload._id ? action.payload : transaction
        ),
        loading: false,
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
    case SORT_TRANSACTIONS_ASC:
      return {
        ...state,
        transactions: state.transactions.sort((a, b) =>
          a.transactionDate > b.transactionDate ? 1 : -1
        ),
      };
    case SORT_TRANSACTIONS_DESC:
      return {
        ...state,
        transactions: state.transactions
          .sort((a, b) => (a.transactionDate > b.transactionDate ? 1 : -1))
          .reverse(),
      };
    case SORT_TRANSACTIONS_BY_NAME:
      return {
        ...state,
        transactions: state.transactions.sort((a, b) =>
          a.description > b.description ? 1 : -1
        ),
      };
    // === TRANSACTION CATEGORIES ===
    case GET_TRANSACTION_CATEGORIES:
      return {
        ...state,
        transactionCategories: action.payload,
        loading: false,
      };
    case ADD_TRANSACTION_CATEGORY:
      return {
        ...state,
        transactionCategories: [...state.transactionCategories, action.payload],
      };
    case DELETE_TRANSACTION_CATEGORY:
      return {
        ...state,
        transactionCategories: state.transactionCategories.filter(
          (category) => category._id !== action.payload
        ),
        loading: false,
      };
    // === TIMESPANS ===
    case REMOVE_TIMESPAN:
      console.log("REMOVE_ ", action.payload);
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
      console.log("ADD: ", action.payload);
      return {
        ...state,
        timeSpans: [...state.timeSpans, action.payload],
        loading: false,
      };
    case UPDATE_TIMEINTERVAL:
      console.log("UPATE: ", action.payload);
      return {
        ...state,
        timeSpans: state.timeSpans.map((timespan) =>
          timespan._id === action.payload._id ? action.payload : timespan
        ),
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
    case SORT_TIMEINTERVALS_ASC:
      return {
        ...state,
        timeintervalTransactions: state.timeintervalTransactions.sort((a, b) =>
          a.timeSpan.startDate > b.timeSpan.startDate ? 1 : -1
        ),
      };
    case SET_CURRENT_TIMEINTERVAL:
      return {
        ...state,
        currentTimeInterval: action.payload,
      };
    case CLEAR_CURRENT_TIMEINTERVAL:
      return {
        ...state,
        currentTimeInterval: null,
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
