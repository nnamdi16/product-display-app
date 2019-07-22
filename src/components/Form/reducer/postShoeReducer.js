import { ADD_SHOE, DELETE_SHOE, UPDATE_SHOE } from "../actions/types";
const initialState = {
  shoe: {},
  shoes: []
};

export default (state, action) => {
  state = initialState;

  switch (action.type) {
    case ADD_SHOE:
      return {
        ...state,
        shoe: action.payload
      };
    case DELETE_SHOE:
      return {
        ...state,
        shoes: state.shoes.filter(shoe => shoe.id !== action.payload)
      };
    case UPDATE_SHOE:
      return {
        ...state,
        shoe: state.shoes.map(shoe =>
          shoe.id === action.payload.id ? (shoe = action.payload) : shoe
        )
      };
    default:
      return state;
  }
};
