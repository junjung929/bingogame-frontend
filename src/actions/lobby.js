import { ROOT_URL } from "../constants";
import {
  CREATE_PROFILE,
  CREATE_ROOM,
  FETCH_ROOMS
} from "constants/ActionTypes";
import { createAction } from "redux-actions";
import { randomArrayGenerate } from "../components/functions";
import socketIOClient from "socket.io-client";

export const createProfile = user => {
  return (dispatch, getState) => {
    const { lobby } = getState();
    dispatch({
      type: CREATE_PROFILE,
      payload: user
    });
  };
};
export const createRoom = room => {
  return (dispatch, getState) => {
    const { lobby } = getState();
    const { rooms } = lobby;
    rooms.push(room);
    dispatch({
      type: CREATE_ROOM,
      payload: rooms
    });
  };
};
export const fetchRooms = () => {
  return (dispatch, getState) => {
    const socket = socketIOClient(ROOT_URL);
    socket.on("call rooms", rooms => {
      console.log(rooms);
      dispatch({
        type: FETCH_ROOMS,
        payload: rooms
      });
    });
  };
};
