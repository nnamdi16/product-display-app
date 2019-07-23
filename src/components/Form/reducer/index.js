//Combining all the reducers to be passed to createStore.
import { combineReducers } from "redux";
import postShoeReducer from "./postShoeReducer";

export default combineReducers({
  post: postShoeReducer
});
