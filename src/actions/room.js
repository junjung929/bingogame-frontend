import axios from "axios";
import { ROOT_URL } from "../constants";
import { CREATE_ROOM, FETCH_ROOM } from "../constants/ActionTypes";

const URL = `${ROOT_URL}/rooms`;

export const fetchRoom = roomId => {
  const query = `/fetch`;
  const url = `${URL}${query}`;
  const config = {
    method: "get",
    url,
    params: {
      id: roomId
    }
  };
  const request = axios(config);

  return dispatch => {
    return new Promise((resolve, reject) => {
      request
        .then(({ data }) => {
          dispatch({
            type: FETCH_ROOM,
            payload: data
          });
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
};
export const createRoom = maxUser => {
  const query = `/create`;
  const url = `${URL}${query}`;
  const config = {
    method: "post",
    url,
    params: {
      maxUser
    }
  };

  const request = axios(config);

  return dispatch => {
    return new Promise((resolve, reject) => {
      request
        .then(({ data }) => {
          dispatch({
            type: CREATE_ROOM,
            payload: data
          });
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
};
