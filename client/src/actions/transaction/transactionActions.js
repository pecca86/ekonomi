import {
  CREATE_TRANSACTION,
  SET_LOADING,
  GET_TRANSACTIONS,
  DELETE_TRANSACTION,
  SET_TIMEINTERVALL,
  GET_TIMESPANS,
  FLUSH_TIMEINTERVALLS,
  ADD_TIMESPAN,
  REMOVE_TIMESPAN,
  REMOVE_TIMEINTERVAL_TRANSACTION
} from "./transactionTypes";
import axios from "axios";
import { setAlert } from "../alerts/alertActions";

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

// Create a new Time Span for the account
// takes in an object with startDate and endDate as formdata
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
    //dispatch(getTimeSpans(accountId))
    dispatch(setTimeintervallTransactions(res.data.data, accountId))
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

// Create a new Transaction
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
  } catch (err) {
    dispatch(setAlert("Failed to create a new Transaction", "danger"));
  }
};

// DELETE a transaction
export const deleteTransaction = (transactionId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/transactions/${transactionId}`);
    dispatch({
      type: DELETE_TRANSACTION,
      payload: transactionId,
    });
  } catch (err) {
    dispatch(setAlert("Failed to delete the transaction", "danger"));
  }
};

// Deletes a timeinterval Transaction upon deleteTimeSpan 
export const deleteTimeIntervalTransaction = (timeSpanId) => dispatch => {
  dispatch({
    type: REMOVE_TIMEINTERVAL_TRANSACTION,
    payload: timeSpanId
  })
}

// Delete a Time Span that is associated with current account
export const deleteTimeSpan = (timeSpanId, accountId="") => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/timespans/${timeSpanId}`);
    dispatch({
      type: REMOVE_TIMESPAN,
      payload: timeSpanId,
    });
    dispatch(setAlert("Time Span removed!", "success"));
    if (accountId) {
      dispatch(getTimeSpans(accountId))
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
