import { GET_SHOES, GET_SHOE } from "./types";
import apiPlaceholder from "../../../apis/apiPlaceholder";

//Action creator to get all shoes
export const onGetShoes = () => async dispatch => {
  try {
    const shoeDetails = await apiPlaceholder.get("/products");
    return dispatch({
      type: GET_SHOES,
      payload: shoeDetails.data
    });
  } catch (err) {
    console.log(err);
  } finally {
    console.log("done");
  }
};

//Action creator to get a single shoe.
export const onGetShoe = (id, cb) => async dispatch => {
  try {
    const response = await apiPlaceholder.get(`/products/${id}`);
    if (cb) {
      cb();
    }
    return dispatch({
      type: GET_SHOE,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log("done");
  }
};
