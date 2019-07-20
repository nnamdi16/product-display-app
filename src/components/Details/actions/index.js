import { GET_SHOES } from "./types";
import apiPlaceholder from "../../../apis/apiPlaceholder";
// const { getShoes } = require("../../API/index");

//Action creator
export const onGetShoes = () => async dispatch => {
  try {
    const shoeDetails = await apiPlaceholder.get("/footwears");
    console.log(shoeDetails);
    // const shoeDetails = await getShoes();
    dispatch({
      type: GET_SHOES,
      payload: shoeDetails.data
    });
  } catch (err) {
    console.log(err);
  } finally {
    console.log("done");
  }
};
