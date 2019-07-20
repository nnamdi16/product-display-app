import detailsReducer from "./detailsReducer";
import { combineReducers } from "redux";

export default combineReducers({
  details: detailsReducer
});
