import { ADD_SHOE } from "../actions/types";
import apiPlaceholder from "../../../apis/apiPlaceholder";

export const onPostShoes = data => async dispatch => {
  try {
    const response = await apiPlaceholder.post("/footwears", data);
    dispatch({
      type: ADD_SHOE,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log("done");
  }
};
