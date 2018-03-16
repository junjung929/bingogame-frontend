import { BINGO_START, ADD_SELECTED, BINGO_UPDATE, ADD_USER } from "../constants/ActionTypes";

const initialState = { user: undefined, numbers: [], selected: [] };

export default function bingo(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return { ...state, user: action.payload };
    case BINGO_START:
      return { ...state, numbers: action.payload, selected: [] };
    case ADD_SELECTED:
      return { ...state, selected: action.payload };
    case BINGO_UPDATE:
      return { ...state, numbers: action.payload };
    default:
      return state;
  }
}
