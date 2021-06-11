import {
  CREATE_TRANSACTION,
  GET_TRANSACTIONS,
  SET_LOADING,
} from "../actions/transaction/transactionTypes";

const initialState = {
  transactions: [],
  timeintervalTransactions: [],
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
        loading: false
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
