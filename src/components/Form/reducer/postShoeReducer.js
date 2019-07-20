const initialState = {
  shoe: {}
};

export default (state, action) => {
  state = initialState;

  switch (action.type) {
    case "ADD_SHOE":
      return {
        ...state,
        recipe: action.payload
      };

    default:
      return state;
  }
};
