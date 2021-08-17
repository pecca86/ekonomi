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
  SORT_TRANSACTIONS_BY_CATEGORY,
  SET_CURRENT_TIMEINTERVAL,
  CLEAR_CURRENT_TIMEINTERVAL,
  UPDATE_TIMEINTERVAL,
  SORT_TIMEINTERVALS_ASC,
  GET_TRANSACTION_CATEGORIES,
  ADD_TRANSACTION_CATEGORY,
  DELETE_TRANSACTION_CATEGORY,
  UPDATE_TRANSACTION_CATEGORY,
  SET_CURRENT_TRANSACTION_CATEGORY,
  CLEAR_CURRENT_TRANSACTION_CATEGORY,
  ADD_TO_CURRENT_TANSACTIONS,
  REMOVE_FROM_CURRENT_TRANSACTIONS,
  CLEAR_CURRENT_TRANSACTIONS,
  FILTER_TRANSACTIONS,
  CLEAR_FILTER,
  UPDATE_MANY,
  DELETE_MANY,
  CREATE_MANY,
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
  currentTransactionCategory: null,
  currentTransactions: [],
  filteredTransactions: [],
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
    case CREATE_MANY:
      return {
        ...state,
        transactions: [...state.transactions, ...action.payload],
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
    case DELETE_MANY:
      const newArr = [...state.transactions]; //making a new array
      for (let trans of action.payload) {
        const index = state.transactions.findIndex(
          (tr) => tr._id === trans._id
        ); //finding index of the item
        newArr.splice(index, 1); // Splicing it out from the array
      }

      console.log(newArr);

      return {
        ...state,
        transactions: newArr,
        loading: false,
      };
    case UPDATE_MANY:
      const newArray = [...state.transactions]; //making a new array
      for (let trans of action.payload) {
        const index = state.transactions.findIndex(
          (tr) => tr._id === trans._id
        ); //finding index of the item
        newArray[index] = trans; //changing value in the new array
      }
      return {
        ...state,
        transactions: newArray,
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
          a.description.toLowerCase() > b.description.toLowerCase() ? 1 : -1
        ),
      };
    case SORT_TRANSACTIONS_BY_CATEGORY:
      return {
        ...state,
        transactions: state.transactions.sort((a, b) =>
          a.category.transactionCategory.toLowerCase() > b.category.transactionCategory.toLowerCase()
            ? 1
            : -1
        ),
      };
    case ADD_TO_CURRENT_TANSACTIONS:
      return {
        ...state,
        currentTransactions: [...state.currentTransactions, action.payload],
      };
    case REMOVE_FROM_CURRENT_TRANSACTIONS:
      return {
        ...state,
        currentTransactions: state.currentTransactions.filter(
          (trans) => trans !== action.payload
        ),
      };
    case CLEAR_CURRENT_TRANSACTIONS:
      return {
        ...state,
        currentTransactions: [],
      };
    case FILTER_TRANSACTIONS:
      return {
        ...state,
        filteredTransactions: state.transactions.filter((transaction) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            transaction.description.match(regex) ||
            transaction.category.transactionCategory.match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filteredTransactions: [],
      };
    // === TRANSACTION CATEGORIES ===
    case GET_TRANSACTION_CATEGORIES:
      const categories = action.payload;
      return {
        ...state,
        //transactionCategories: action.payload,
        transactionCategories: categories.sort((a, b) =>
          a.transactionCategory.toLowerCase() > b.transactionCategory.toLowerCase() ? 1 : -1
        ),
        loading: false,
      };
    case ADD_TRANSACTION_CATEGORY:
      let newCategories = [...state.transactionCategories, action.payload];
      newCategories = newCategories.sort((a, b) =>
        a.transactionCategory.toLowerCase() > b.transactionCategory.toLowerCase() ? 1 : -1
      );
      return {
        ...state,
        transactionCategories: newCategories,
      };
    case DELETE_TRANSACTION_CATEGORY:
      return {
        ...state,
        transactionCategories: state.transactionCategories.filter(
          (category) => category._id !== action.payload
        ),
        loading: false,
      };
    case UPDATE_TRANSACTION_CATEGORY:
      return {
        ...state,
        transactionCategories: state.transactionCategories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        ),
        loading: false,
      };
    case SET_CURRENT_TRANSACTION_CATEGORY:
      return {
        ...state,
        currentTransactionCategory: action.payload,
      };
    case CLEAR_CURRENT_TRANSACTION_CATEGORY:
      return {
        ...state,
        currentTransactionCategory: null,
      };

    // === TIMESPANS ===
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
    case UPDATE_TIMEINTERVAL:
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
