import {
  CREATE_PROFILE,
  CREATE_ROOM,
  FETCH_ROOMS
} from "constants/ActionTypes";

const initialState = { rooms: [] };

export default function lobby(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROFILE:
      return { ...state, profile: action.payload };
    case CREATE_ROOM:
      return { ...state, rooms: action.payload };
    case FETCH_ROOMS:
      return { ...state, rooms: action.payload };
    default:
      return state;
  }
}
