import {
  CREATE_TRANSACTION,
  SET_LOADING,
  GET_TRANSACTIONS,
  DELETE_TRANSACTION,
  SET_TIMEINTERVALL,
  //GET_TIMEINTERVALLS,
  GET_TIMESPANS,
  FLUSH_TIMEINTERVALLS,
} from "./transactionTypes";
import axios from "axios";
import { setAlert } from "../alerts/alertActions";
import { getAccount } from "../account/accountActions";
import { v4 as uuidv4 } from 'uuid';

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

// Gets all the time spans set for the account
export const getTimeSpans = (accountId) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.get(`/api/v1/timespans/${accountId}`);

    // Create an array with all time spans
    const timeIntervalRes = [];
    res.data.data.map((date) =>
      timeIntervalRes.push({ startDate: date.startDate, endDate: date.endDate })
    );

    // Push to frontend
    timeIntervalRes.forEach((date) =>
      setTimeintervallTransactions(
        { startDate: date.startDate, endDate: date.endDate },
        accountId
      )
    );

    dispatch({
      type: GET_TIMESPANS,
      payload: res.data,
    });
    // Make this function dispatch setTimeinterval?
  } catch (err) {
    dispatch(setAlert("Failed retrieving Account Time Spans", "danger"));
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
      res.data.timeSpan = formData
      res.data.id = uuidv4()

      //put the sum into the data object
      //res.data.data.transactionSum = res.data.calculatedTransactionSum
      dispatch({
        type: SET_TIMEINTERVALL,
        payload: res.data,
      });
      //updates the account so that the new intervall is shown in the UI
      dispatch(getAccount(accountId));
    } catch (err) {
      dispatch(setAlert("Failed at creating a new timeintervall!", "danger"));
    }
  };

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
