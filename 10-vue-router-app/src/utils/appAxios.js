import axios from "axios";
export const appAxios = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: false,
  headers: {
    tokenX: "myToken",
    "Content-Type": "application/json",
  },
});
