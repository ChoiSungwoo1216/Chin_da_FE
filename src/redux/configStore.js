import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import chatlist from "./modules/chatlist";
import user from "./modules/user";
import channel from "./modules/channel"



const middlewares = [thunk];

const rootReducer = combineReducers({ chatlist, user, channel });
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;