import { BINGO_START, ADD_SELECTED, BINGO_UPDATE } from "constants/ActionTypes";
import { createAction } from "redux-actions";
import { randomArrayGenerate } from "../components/functions";

export const bingoStart = length => {
  return (dispatch, getState) => {
    const { bingo } = getState();
    dispatch({
      type: BINGO_START,
      payload: randomArrayGenerate(length)
    });
  };
};
export const addSelected = selectedNum => {
  return (dispatch, getState) => {
    const { bingo } = getState();
    const { selected } = bingo;
    selected.push(selectedNum);
    dispatch({
      type: ADD_SELECTED,
      payload: selected
    });
  };
};
export const bingoUpdate = newNumbers => {
  return (dispatch, getState) => {
    const { bingo } = getState();
    dispatch({
      type: BINGO_UPDATE,
      payload: newNumbers
    });
  };
};
