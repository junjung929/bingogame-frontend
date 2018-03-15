import socketIOClient from "socket.io-client";

const HTTP = "http://";
const HOST = "192.168.1.101";
export const URL = `${HTTP}${HOST}`;
export const PORT = 4001;
export const ROOT_URL = `${URL}:${PORT}`;

export const socket = socketIOClient(ROOT_URL);
