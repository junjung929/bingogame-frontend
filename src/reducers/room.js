import { CREATE_ROOM, FETCH_ROOM } from "../constants/ActionTypes";

const initialState = {
  roomTitle: undefined,
  maxUser: 0,
  id: undefined,
  isCreated: false,
  isExist: false,
  connectedUsers: 0,
  size: 25
};

export default function room(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM:
      return {
        ...state,
        roomTitle: action.payload.roomTitle,
        maxUser: parseInt(action.payload.maxUser),
        id: action.payload.id,
        connectedUsers: 0,
        isCreated: true
      };
    case FETCH_ROOM:
      return {
        ...state,
        maxUser: parseInt(action.payload.maxUser),
        id: action.payload.id,
        connectedUsers: action.payload.connectedUsers,
        isExist: true,
        size: action.payload.size
      };
    default:
      return state;
  }
}
