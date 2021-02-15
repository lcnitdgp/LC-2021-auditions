import {
  CREATE_FORM_ELEMENT,
  EDIT_FORM_ELEMENT,
  DELETE_FORM_ELEMENT,
  FETCH_FORM,
  FETCH_USER,
} from "./types";
import axiosConfig from "../config/axios";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

var header = {
  headers: {
    "x-auth-token": localStorage.getItem("token"),
  },
};

// auth routes
export const fetchUser = () => async (dispatch) => {
  console.log(backendUrl);
  console.log(process.env);
  header = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const response = await axios.get(`${backendUrl}/api/current`, header);
  console.log(header);
  console.log(response);
  dispatch({ type: FETCH_USER, payload: response.data });
};
export const logOutUser = () => async (dispatch) => {
  const response = await axios.get(`${backendUrl}/auth/logout`);
  localStorage.removeItem('token');
  console.log(response);
  dispatch({ type: FETCH_USER, payload: response.data });
};
export const updateUser = (form) => async (dispatch) => {
  console.log("Updating form.");
  console.log(localStorage.getItem("token"));
  const response = await axios.put(`${backendUrl}/api/profile`, form, header);
  console.log(response);
  dispatch({ type: FETCH_USER, payload: response.data });
};
//form routes
export const createFormElement = (content, type) => async (dispatch) => {
  console.log("adding form element", content, type);
  console.log(localStorage.getItem("token"));
  const response = await axios.post(
    `${backendUrl}/api/questionsadd`,
    {
      content,
      type,
    },
    header
  );
  console.log(response);
  dispatch({ type: CREATE_FORM_ELEMENT, payload: response.data });
};

export const editFormElement = (formElement) => async (dispatch) => {
  console.log("editing form element:", formElement);
  console.log(localStorage.getItem("token"));
  const response = await axios.put(
    `${backendUrl}/api/questionsupdate`,
    formElement,
    header
  );
  console.log(response);
  dispatch({ type: EDIT_FORM_ELEMENT, payload: response.data });
};

export const deleteFormElement = (id) => async (dispatch) => {
  console.log("deleting form element : ", id);
  console.log(localStorage.getItem("token"));
  const response = await axios.delete(
    `${backendUrl}/api/questionsdelete`,
    {
      data: { id },
    },
    header
  );
  console.log(response);
  dispatch({ type: DELETE_FORM_ELEMENT, payload: response.data });
};

export const fetchForm = () => async (dispatch) => {
  console.log("Fetching Form.");
  console.log(localStorage.getItem("token"));
  const response = await axios.get(`${backendUrl}/api/questionslist`, header);
  console.log(response);
  dispatch({ type: FETCH_FORM, payload: response.data.qList });
};

// responses

export const submitResponse = (userResponse) => async (dispatch) => {
  console.log("submitting response :", userResponse);
  console.log(localStorage.getItem("token"));
  const response = await axios.post(
    `${backendUrl}/api/response`,
    userResponse,
    header
  );
  console.log(response);
  dispatch({ type: FETCH_USER, payload: response.data });
};
