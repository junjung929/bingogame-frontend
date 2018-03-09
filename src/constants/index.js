import socketIOClient from "socket.io-client";

export const URL = "http://192.168.1.100";
export const PORT = 4001;
export const ROOT_URL = `${URL}:${PORT}`;

export const socket = socketIOClient(ROOT_URL);
