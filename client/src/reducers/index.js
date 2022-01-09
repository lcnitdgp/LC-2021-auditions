import { authReducer } from "./authReducer";
import { adminFormReducer } from "./adminFormReducer";
import { combineReducers } from "redux";

export default combineReducers({
  auth: authReducer,
  adminForm: adminFormReducer,
});
