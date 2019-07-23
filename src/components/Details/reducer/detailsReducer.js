import { GET_SHOES, GET_SHOE } from "../actions/types";

//Create initialState
const initialState = {
  shoes: [],
  shoe: {}
};

//Create reducer for different action types
export default (state, action) => {
  state = initialState;

  switch (action.type) {
    case GET_SHOES:
      return { ...state, shoes: action.payload };
    case GET_SHOE:
      return { ...state, shoe: action.payload };
    default:
      return state;
  }
};
