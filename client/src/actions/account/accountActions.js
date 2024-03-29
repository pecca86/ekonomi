import {
  GET_ACCOUNTS,
  GET_ACCOUNT,
  UPDATE_ACCOUNT,
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  ACCOUNT_ERROR,
  SET_LOADING,
} from "./accountTypes";
import axios from "axios";
import { setAlert } from "../alerts/alertActions";

export const getAccounts = () => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get("/api/v1/accounts");

    dispatch({
      type: GET_ACCOUNTS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: ACCOUNT_ERROR,
    });
  }
};

export const getAccount = (accountId) => async (dispatch) => {
  setLoading();
  try {
    const res = await axios.get(`/api/v1/accounts/${accountId}`);
    dispatch({
      type: GET_ACCOUNT,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert("Failed to get the account", "danger"));
  }
};

export const createAccount = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);
  try {
    setLoading();
    const res = await axios.post("/api/v1/accounts", body, config);
    dispatch({
      type: ADD_ACCOUNT,
      payload: res.data.data,
    });

    dispatch(setAlert("Account added!", "success"));
  } catch (err) {
    dispatch(
      setAlert(
        "Error in creating account. Check if any fields were missing.",
        "danger"
      )
    );
  }
};

export const updateAccount = (formData, accountId) => async (dispatch) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);

  try {
    setLoading();

    const res = await axios.put(`/api/v1/accounts/${accountId}`, body, config);

    dispatch({
      type: UPDATE_ACCOUNT,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert("Failed to update Account details!", "danger"));
  }
};

export const deleteAccount = (accountId) => async (dispatch) => {
  //TODO: CLEAR ACCOUNT TRANSACTIONS WITH REDUCER CLEAR_TRANSACTIONS
  setLoading();
  try {
    await axios.delete(`/api/v1/accounts/${accountId}`);
    const res = await axios.get("/api/v1/accounts");
    dispatch({
      type: DELETE_ACCOUNT,
      payload: accountId,
    });
    dispatch({
      type: GET_ACCOUNTS,
      payload: res.data.data,
    });
    dispatch(
      setAlert("Account and all related transactions were deleted!", "success")
    );
  } catch (err) {
    dispatch(setAlert("Failed to delete the account", "danger"));
  }
};


// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
