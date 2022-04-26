// import { io } from "socket.io-client";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://finance360api.herokuapp.com"
})

//http://localhost:8000
// https://finance360api.herokuapp.com
// export const socketConnection = io("https://urnewspost-sockets.herokuapp.com/");
