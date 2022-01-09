import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Set config defaults when creating the instance
// pass cookies with every request
// axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

// use the default backend url

export default instance;
