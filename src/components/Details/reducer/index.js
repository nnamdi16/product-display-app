import detailsReducer from "./detailsReducer";
import { combineReducers } from "redux";

//Combining all the reducers to be passed to createStore.
export default combineReducers({
  details: detailsReducer
});
