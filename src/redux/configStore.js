import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import chatlist from "./modules/chatlist";
import user from "./modules/user";
import battleFunction from "./modules/battleFunction";

const middlewares = [thunk];

const rootReducer = combineReducers({
  chatlist,
  user,
  battleFunction,
});
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;
