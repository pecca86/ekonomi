import { GET_PROFILE, PROFILE_ERROR } from "./profileTypes";
import { setAlert } from "../alerts/alertActions";
import axios from "axios";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/users/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText },
    });
  }
};
