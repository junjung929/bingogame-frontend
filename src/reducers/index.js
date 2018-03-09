import { combineReducers } from "redux";
import bingo from "./bingo";
import lobby from "./lobby";
import room from "./room";

const rootReducer = combineReducers({
  bingo,
  lobby,
  room
});

export default rootReducer;
