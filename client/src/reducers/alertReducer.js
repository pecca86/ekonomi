import { SET_ALERT, REMOVE_ALERT } from "../actions/alerts/alertTypes";

const initialState = [];

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
}
