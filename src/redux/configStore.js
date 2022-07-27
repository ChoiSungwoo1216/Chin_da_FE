import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import chatlist from "./modules/chatlist.js";
import user from "./modules/user.js";
import battleFunction from "./modules/battleFunction.js";

const middlewares = [thunk];

const rootReducer = combineReducers({
  chatlist,
  user,
  battleFunction,
});
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;
