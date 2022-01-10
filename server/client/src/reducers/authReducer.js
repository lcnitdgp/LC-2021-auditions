import {FETCH_USER} from "../actions/types";

const INITIAL_STATE = null

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER: {
      return action.payload;
    }
    default:
      return state;
  }
};
