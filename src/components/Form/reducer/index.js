import { combineReducers } from "redux";
import postShoeReducer from "./postShoeReducer";

export default combineReducers({
  post: postShoeReducer
});
