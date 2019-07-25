import { ADD_SHOE, DELETE_SHOE, UPDATE_SHOE } from "../actions/types";
import apiPlaceholder from "../../../apis/apiPlaceholder";

//Action for creating a shoe detail
export const onPostShoes = (data, cb) => async dispatch => {
  try {
    const response = await apiPlaceholder.post("/products", data);
    cb();
    return dispatch({
      type: ADD_SHOE,
      payload: response.data
    });
  } catch (error) {
    console.log({ error });
  } finally {
    console.log("done");
  }
};

//Action for deleting a shoe detail
export const onDeleteShoe = (id, callback) => async dispatch => {
  try {
    await apiPlaceholder.delete(`/products/${id}`);
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

//Action for Updating a single shoe
export const onUpdateShoe = (data, cb) => async dispatch => {
  try {
    const { description, image, name, price } = data;
    const payload = { description, image, name, price };
    const response = await apiPlaceholder.put(`/products/${data.id}`, payload);
    cb();
    dispatch({
      type: UPDATE_SHOE,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};
