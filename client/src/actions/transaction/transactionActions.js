import {
  CREATE_TRANSACTION,
  SET_LOADING,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_BY_YEAR,
  CLEAR_TRANSACTIONS_BY_YEAR,
  DELETE_TRANSACTION,
  SET_TIMEINTERVALL,
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
} from "./transactionTypes";
import axios from "axios";
import { setAlert } from "../alerts/alertActions";

// ======= TRANSACTIONS ========

// Gets all Transactions related to this Accouns
export const getAllAccountTransactions = (accountId) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.get(`/api/v1/accounts/${accountId}/transactions`);
    dispatch({
      type: GET_TRANSACTIONS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert("Failed retrieving transactions from server", "danger"));
  }
};

// Gets all Transactions related to this Account by year
export const getAllAccountTransactionsByYear =
  (accountId, year) => async (dispatch) => {
    try {
      setLoading();
      const res = await axios.get(
        `/api/v1/accounts/${accountId}/transactions?transactionDate[gte]=${year}-01-01&transactionDate[lte]=${year}-12-31`
      );
      dispatch({
        type: GET_TRANSACTIONS_BY_YEAR,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch(
        setAlert("Failed retrieving transactions from server", "danger")
      );
    }
  };

// Clears the transactionByYear array
export const clearAccountTransactionsByYear = () => (dispatch) => {
  dispatch({
    type: CLEAR_TRANSACTIONS_BY_YEAR,
  });
};

// Creates a new Transaction
export const createTransaction = (formData, accountId) => async (dispatch) => {
  const body = JSON.stringify(formData);

  try {
    setLoading();

    const res = await fetch(`/api/v1/transactions/${accountId}`, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    dispatch({
      type: CREATE_TRANSACTION,
      payload: data.data,
    });

    dispatch(setAlert("Transaction added!", "success"));
    dispatch(flushTimeIntervalls());
    dispatch(getTimeSpans(accountId));
  } catch (err) {
    dispatch(setAlert("Failed to create a new Transaction", "danger"));
  }
};

// DELETE a transaction
export const deleteTransaction =
  (transactionId, accountId = "") =>
  async (dispatch) => {
    try {
      await axios.delete(`/api/v1/transactions/${transactionId}`);
      dispatch({
        type: DELETE_TRANSACTION,
        payload: transactionId,
      });
      dispatch(flushTimeIntervalls());
      dispatch(getTimeSpans(accountId));
    } catch (err) {
      dispatch(setAlert("Failed to delete the transaction", "danger"));
    }
  };

export const updateTransaction = (formData, accountId) => async (dispatch) => {
  const { id } = formData;
  const body = JSON.stringify(formData);

  try {
    setLoading();

    const res = await fetch(`/api/v1/transactions/${id}`, {
      method: "PUT",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("DATA: ", data.data._id);

    dispatch({
      type: UPDATE_TRANSACTION,
      payload: data.data,
    });

    dispatch(setAlert("Transaction updated!", "success"));
    dispatch(flushTimeIntervalls());
    dispatch(getTimeSpans(accountId));
  } catch (err) {
    dispatch(setAlert("Failed to create a new Transaction", "danger"));
  }
};

// Set the current transaction to be the one the user clicked on
export const setCurrentTransaction = (transaction) => {
  return {
    type: SET_CURRENT_TRANSACTION,
    payload: transaction,
  };
};

// Clear the current transaction
export const clearCurrentTransaction = () => {
  return {
    type: CLEAR_CURRENT_TRANSACTION,
  };
};

// Sorts the transaction ascending according to the date
export const sortTransactionsAscending = () => {
  return {
    type: SORT_TRANSACTIONS_ASC,
  };
};

export const sortTransactionsDescending = () => {
  return {
    type: SORT_TRANSACTIONS_DESC,
  };
};

// ======= TIME INTERVALS / SPANS ========

// Create a new Time Span for the account
// takes in an object with startDate,endDate and timeSpanId as formdata
// After this it will call setTimeIntervallTransaction to put the data in the reducer array TimeintervalTransaction
export const addTimeSpan = (formData, accountId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);

  try {
    setLoading();
    const res = await axios.post(
      `/api/v1/timespans/${accountId}`,
      body,
      config
    );

    dispatch({
      type: ADD_TIMESPAN,
      payload: res.data.data,
    });
    dispatch(setAlert("Time Span added!", "success"));
    dispatch(setTimeintervallTransactions(res.data.data, accountId));
  } catch (err) {
    dispatch(setAlert("Failed at creating a new time span!", "danger"));
  }
};

// Gets all the time spans set for the account
export const getTimeSpans = (accountId) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.get(`/api/v1/timespans/${accountId}`);

    // Create an array with all time spans
    const timeIntervalRes = [];
    res.data.data.map((date) =>
      timeIntervalRes.push({
        startDate: date.startDate,
        endDate: date.endDate,
        timeSpanId: date._id,
      })
    );
    // Push to frontend
    timeIntervalRes.map((date) =>
      dispatch(
        setTimeintervallTransactions(
          {
            startDate: date.startDate,
            endDate: date.endDate,
            _id: date.timeSpanId,
          },
          accountId
        )
      )
    );

    dispatch({
      type: GET_TIMESPANS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(
      setAlert(`Failed retrieving Account Time Spans: ${err}`, "danger")
    );
  }
};

// Sets data to the reducer array of timeintervalTransactions. This array also consists of the time span.
// EXAMPLE URL: /api/v1/accounts/60c330ea14b8c440ec8e5eee/transactions?transactionDate[gte]=2021-05-02&transactionDate[lte]=2021-06-27
export const setTimeintervallTransactions =
  (formData, accountId) => async (dispatch) => {
    const { startDate, endDate } = formData;
    try {
      setLoading();
      const res = await axios.get(
        `/api/v1/accounts/${accountId}/transactions?transactionDate[gte]=${startDate}&transactionDate[lte]=${endDate}`
      );

      // Put time span inside the res.data so we can access it in our UI
      res.data.timeSpan = formData;

      dispatch({
        type: SET_TIMEINTERVALL,
        payload: res.data,
      });
    } catch (err) {
      dispatch(setAlert("Failed at creating a new timeintervall!", "danger"));
    }
  };

// Deletes a timeinterval Transaction upon deleteTimeSpan
export const deleteTimeIntervalTransaction = (timeSpanId) => (dispatch) => {
  dispatch({
    type: REMOVE_TIMEINTERVAL_TRANSACTION,
    payload: timeSpanId,
  });
};

// Delete a Time Span that is associated with current account
export const deleteTimeSpan =
  (timeSpanId, accountId = "") =>
  async (dispatch) => {
    try {
      await axios.delete(`/api/v1/timespans/${timeSpanId}`);
      dispatch({
        type: REMOVE_TIMESPAN,
        payload: timeSpanId,
      });
      dispatch(setAlert("Time Span removed!", "success"));
      if (accountId) {
        dispatch(getTimeSpans(accountId));
      }
    } catch (err) {
      dispatch(setAlert("Failed to delete the timespan", "danger"));
    }
  };

// Flush the timeintervall array
export const flushTimeIntervalls = () => (dispatch) => {
  dispatch({
    type: FLUSH_TIMEINTERVALLS,
  });
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
