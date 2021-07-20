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
  SORT_TRANSACTIONS_BY_NAME,
  SET_CURRENT_TIMEINTERVAL,
  CLEAR_CURRENT_TIMEINTERVAL,
  UPDATE_TIMEINTERVAL,
  SORT_TIMEINTERVALS_ASC,
  GET_TRANSACTION_CATEGORIES,
  ADD_TRANSACTION_CATEGORY,
  DELETE_TRANSACTION_CATEGORY,
  UPDATE_TRANSACTION_CATEGORY,
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
  (accountId, year, month, day) => async (dispatch) => {
    try {
      setLoading();
      const res = await axios.get(
        `/api/v1/accounts/${accountId}/transactions?transactionDate[gte]=${year}-${month}-${day}&transactionDate[lte]=${
          year + 1
        }-${month}-${day}`
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

  const { monthsRecurring } = formData;
  const loopCounts = parseInt(monthsRecurring, 10);
  // Get month, year and day from our date string
  let month = parseInt(formData.transactionDate.substring(5, 7), 10);
  let year = parseInt(formData.transactionDate.substring(0, 4), 10);
  let day = parseInt(formData.transactionDate.substring(8, 10));
  // If we jump from i.e. 31-1-2020 to next month that has only 28 days
  let tempDay;

  // array with months that contain 30 days for checking when creating recurring transactions
  const monthsWith30Days = [4, 6, 9, 11];

  // Loop trough the amount of months forward we want to duplicate the transaction, incrementing each time
  // the month value by one
  if (loopCounts > 0) {
    for (let i = 0; i < loopCounts; i++) {
      if (month > 12) {
        month = 1;
        year = parseInt(year);
        year += 1;
        year.toString();
      }

      //check if the month has 28, 30 or 31 days
      if (month === 2 && day > 28) {
        tempDay = day;
        day = 28;
      }

      if (monthsWith30Days.includes(month) && day > 30) {
        day = 30;
      }

      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }

      let newDate = `${year}-${month}-${day}`;

      formData.transactionDate = newDate;

      let dataBody = JSON.stringify(formData);

      try {
        setLoading();

        const res = await fetch(`/api/v1/transactions/${accountId}`, {
          method: "POST",
          body: dataBody,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        dispatch({
          type: CREATE_TRANSACTION,
          payload: data.data,
        });

        // When loop ends update these
        if (i === loopCounts - 1) {
          dispatch(setAlert("Transactions added!", "success"));
          dispatch(flushTimeIntervalls());
          dispatch(getTimeSpans(accountId));
        }
        // increment month
        month = parseInt(month);
        month += 1;
        // Check if tempDay is set
        if (tempDay) {
          day = tempDay;
        }
      } catch (err) {
        dispatch(setAlert("Failed to create a new Transaction", "danger"));
      }
    }
  } else {
    // === WITHOUT RECURRING ==
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

// update existing transaction
export const updateTransaction = (formData, accountId) => async (dispatch) => {
  const { id, transactionType, sum } = formData;
  if (transactionType === "Spending") {
    formData.sum = sum * -1;
  }
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

export const sortTransactionsByName = () => {
  return {
    type: SORT_TRANSACTIONS_BY_NAME,
  };
};

// ======= TRANSACTION CATEGORIES ========
export const getTransactionCategories = () => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get("/api/v1/transactioncategories");

    dispatch({
      type: GET_TRANSACTION_CATEGORIES,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert("Failed to get the Transaction Categories", "danger"));
  }
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
      dispatch({
        type: SORT_TIMEINTERVALS_ASC,
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

// Update existing timeinterval
export const updateTimeInterval =
  (formData, timeSpanId, accountId) => async (dispatch) => {
    console.log("update action", formData);

    const body = JSON.stringify(formData);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      setLoading();

      const res = await axios.put(
        `/api/v1/timespans/${timeSpanId}`,
        body,
        config
      );

      dispatch(setAlert("Time Interval updated!", "success"));
      // This does basically nothing at me moment...
      dispatch({
        type: UPDATE_TIMEINTERVAL,
        payload: res.data.data,
      });
      // These cause the component to rerender
      dispatch(flushTimeIntervalls());
      dispatch(getTimeSpans(accountId));
    } catch (error) {
      dispatch(setAlert("Failed to update Time Interval!", "danger"));
    }
  };

// Set current Time Interval
export const setCurrentTimeInterval = (timeInterval) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_TIMEINTERVAL,
    payload: timeInterval,
  });
};

// Clear current Time Interval
export const clearCurrentTimeInterval = () => (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT_TIMEINTERVAL,
  });
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
