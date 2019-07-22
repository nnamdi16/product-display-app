import { ADD_SHOE, DELETE_SHOE, UPDATE_SHOE } from "../actions/types";
import apiPlaceholder from "../../../apis/apiPlaceholder";

export const onPostShoes = data => async dispatch => {
  try {
    const response = await apiPlaceholder.post("/footwears", data);
    return dispatch({
      type: ADD_SHOE,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log("done");
  }
};

export const onDeleteShoe = (id, callback) => async dispatch => {
  try {
    await apiPlaceholder.delete(`/footwears/${id}`);
    dispatch({
      type: DELETE_SHOE,
      payload: id
    });
    callback();
  } catch (error) {
    dispatch({
      type: DELETE_SHOE,
      payload: id
    });
  } finally {
    console.log("done");
  }
};

export const onUpdateShoe = data => async dispatch => {
  try {
    const response = await apiPlaceholder.put(`/footwears/{data.id}`, data);
    dispatch({
      type: UPDATE_SHOE,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};
