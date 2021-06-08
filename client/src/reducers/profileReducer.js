import { GET_PROFILE, PROFILE_ERROR } from "../actions/profile/profileTypes";

const initialState = {
  profile: null,
  error: null
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
          ...state,
          profile: action.payload
      }
    case PROFILE_ERROR:
      return {
          ...state,
          error: action.payload
      };
    default:
      return state;
  }
}
