import {
  CREATE_FORM_ELEMENT,
  EDIT_FORM_ELEMENT,
  DELETE_FORM_ELEMENT,
  FETCH_FORM,
  FETCH_USER,
} from "./types";

import axios from "../config/axios";

// auth routes
export const fetchUser = () => async (dispatch) => {
  const response = await axios.get(`/api/current`);
  console.log(response);
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const logOutUser = () => async (dispatch) => {
  const response = await axios.get(`/auth/logout`);
  console.log(response);
  dispatch({ type: FETCH_USER, payload: response.data });
};
export const updateUser = (form) => async (dispatch) => {
  console.log("Updating form.");
  const response = await axios.put("/api/profile", form);
  console.log(response);
  dispatch({ type: FETCH_USER, payload: response.data });
};
//form routes
export const createFormElement = (content, type) => async (dispatch) => {
  console.log("adding form element", content, type);

  const response = await axios.post(`/api/questionsadd`, {
    content,
    type,
  });
  console.log(response);
  dispatch({ type: CREATE_FORM_ELEMENT, payload: response.data });
};

export const editFormElement = (formElement) => async (dispatch) => {
  console.log("editing form element:", formElement);
  const response = await axios.put(`/api/questionsupdate`, formElement);
  console.log(response);
  dispatch({ type: EDIT_FORM_ELEMENT, payload: response.data });
};

export const deleteFormElement = (id) => async (dispatch) => {
  console.log("deleting form element : ", id);

  const response = await axios.delete(`/api/questionsdelete`, {
    data: { id },
  });
  console.log(response);
  dispatch({ type: DELETE_FORM_ELEMENT, payload: response.data });
};

export const fetchForm = () => async (dispatch) => {
  console.log("Fetching Form.");
  const response = await axios.get(`/api/questionslist`);
  console.log(response);
  dispatch({ type: FETCH_FORM, payload: response.data.qList });
};

// responses
export const submitResponse = (userResponse) => async (dispatch) => {
  console.log("submitting response :", userResponse);
  const response = await axios.post(`/api/response`, userResponse);
  console.log(response);
  dispatch({ type: FETCH_USER, payload: response.data });
};
