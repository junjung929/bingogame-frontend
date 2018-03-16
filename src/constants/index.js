import socketIOClient from "socket.io-client";

const HTTP = "http://";
const HOST = "10.115.144.153";
export const URL = `${HTTP}${HOST}`;
export const PORT = 4001;
export const ROOT_URL = `${URL}:${PORT}`;

export const socket = socketIOClient(ROOT_URL);
