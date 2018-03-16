import { CREATE_PROFILE, FETCH_ROOMS } from "../constants/ActionTypes";

const initialState = [];

export default function lobby(state = initialState, action) {
  switch (action.type) {
    case FETCH_ROOMS:
      return action.payload;
    default:
      return state;
  }
}
