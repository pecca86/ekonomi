import {
  GET_ACCOUNTS,
  GET_ACCOUNT,
  UPDATE_ACCOUNT,
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  DELETE_TIMEINTERVALL,
  ACCOUNT_ERROR,
} from "./accountTypes";
import axios from "axios";
import { setAlert } from "../alerts/alertActions";

export const getAccounts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/accounts");

    dispatch({
      type: GET_ACCOUNTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ACCOUNT_ERROR,
    });
  }
};

export const getAccount = () => async (dispatch) => {
  console.log("bög");
};

export const createAccount = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // In order to make sure the balance gets passed in as a number
  const body = JSON.stringify({...formData, 'balance': parseFloat(formData.balance) });

  try {
    const res = await axios.post("/api/v1/accounts", body, config);
    dispatch({
      type: ADD_ACCOUNT,
      payload: res.data,
    });
    dispatch(setAlert("Account added!", "success"));
  } catch (err) {
    dispatch({
      type: ACCOUNT_ERROR,
      payload: err.response.data.error,
    });
    dispatch(setAlert("IBAN Already Taken!", "danger"));
  }
};

export const updateAccount = () => async (dispatch) => {
  console.log("bög");
};

export const deleteAccount = () => async (dispatch) => {
  console.log("bög");
};

export const deleteTimeintervall = () => async (dispatch) => {
  console.log("TOME HOMO");
};
