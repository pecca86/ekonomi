import { CREATE_TRANSACTION } from "../actions/transaction/transactionTypes";

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
        loading: false
      };
    default:
      return state;
  }
};
