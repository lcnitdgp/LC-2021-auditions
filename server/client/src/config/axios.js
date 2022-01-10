import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

export default instance;
