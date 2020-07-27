import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import stories from "../stories";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    stories,
  });

export default createRootReducer;
