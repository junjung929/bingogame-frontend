import {
  BINGO_START,
  ADD_SELECTED,
  BINGO_UPDATE,
  ADD_USER
} from "../constants/ActionTypes";
// import { createAction } from "redux-actions";
import { randomArrayGenerate } from "../components/functions";

export const bingoStart = (length, init) => {
  console.log(length);
  return (dispatch, getState) => {
    // const { bingo } = getState();
    const bingoBoard = randomArrayGenerate(length, init);
    dispatch({
      type: BINGO_START,
      payload: bingoBoard
    });
    return new Promise(resolve =>
      setTimeout(() => {
        resolve(bingoBoard);
      }, 1000)
    );
  };
};
export const bingoUpdate = newNumbers => {
  return (dispatch, getState) => {
    // const { bingo } = getState();
    dispatch({
      type: BINGO_UPDATE,
      payload: newNumbers
    });
    return new Promise(resolve =>
      setTimeout(() => {
        resolve(newNumbers);
      }, 1000)
    );
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
    return new Promise(resolve =>
      setTimeout(() => {
        resolve(selected);
      }, 1000)
    );
  };
};
export const addUser = user => {
  return (dispatch, getState) => {
    const { bingo } = getState();
    dispatch({
      type: ADD_USER,
      payload: user
    });
  };
};
