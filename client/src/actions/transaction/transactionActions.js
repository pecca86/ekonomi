import { CREATE_TRANSACTION, SET_LOADING } from "./transactionTypes";
import axios from "axios";
import { setAlert } from "../alerts/alertActions";

export const createTransaction = (formData, accountId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      withCredentials: true,
    },
  };

  
  const body = JSON.stringify(formData);
  console.log(body);
  try {
    setLoading();

    /*     const res = await axios.post(
      "/api/v1/transactions/60c258ea6234b72b0c5574c9",
      body,
      config
    ); */
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
      payload: data,
    });

    dispatch(setAlert("Transaction added!", "success"));
  } catch (err) {
    console.log(err);
    dispatch(setAlert("Failed to create a new Transaction", "danger"));
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
