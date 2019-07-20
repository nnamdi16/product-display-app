import { GET_SHOES } from "../actions/types";
const initialState = {
  shoes: []
};

export default (state, action) => {
  state = initialState;

  switch (action.type) {
    case GET_SHOES:
      return { ...state, shoes: action.payload };
    default:
      return state;
  }
};
