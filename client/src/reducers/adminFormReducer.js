import {
  CREATE_FORM_ELEMENT,
  EDIT_FORM_ELEMENT,
  FETCH_FORM,
  DELETE_FORM_ELEMENT,
} from "../actions/types";

export const adminFormReducer = (state = {}, action) => {
//    console.log(action);
   if(!action.payload || action.payload.error){
    //    console.log("No action exsits")
       return state;
   }
  switch (action.type) {
    case CREATE_FORM_ELEMENT: {
      return { ...state, [action.payload._id]: action.payload };
    }
    case EDIT_FORM_ELEMENT: {
      return { ...state, [action.payload._id]: action.payload };
    }
    case DELETE_FORM_ELEMENT: {
      // get only id here 
      const { [action.payload]: value, ...newState } = state;
      return newState;
    }
    case FETCH_FORM: {
      var newState = {};
      action.payload.forEach((elem) => (newState[elem._id] = elem));
      return newState;
    }
    default: {
      return state;
    }
  }
};
