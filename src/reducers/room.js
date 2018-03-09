import { CREATE_ROOM, FETCH_ROOM } from "constants/ActionTypes";

const initialState = {
  maxUser: 0,
  id: undefined,
  isCreated: false,
  isExist: false
};

export default function room(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM:
      return {
        ...state,
        maxUser: action.payload.maxUser,
        id: action.payload.id,
        isCreated: true
      };
    case FETCH_ROOM:
      return {
        ...state,
        maxUser: action.payload.maxUser,
        id: action.payload.id,
        isExist: true
      };
    default:
      return state;
  }
}
