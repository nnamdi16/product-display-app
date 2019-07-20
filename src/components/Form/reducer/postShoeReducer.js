import { ADD_SHOE } from "../actions/types";
const initialState = {
  shoe: {}
};

export default (state, action) => {
  state = initialState;

  switch (action.type) {
    case ADD_SHOE:
      return {
        ...state,
        shoe: action.payload
      };

    default:
      return state;
  }
};
