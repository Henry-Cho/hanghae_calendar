import { createStore, combineReducers, applyMiddleware } from "redux";
import bucket from "./modules/bucket";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";

export const history = createBrowserHistory();

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);

// reducer 가 여러 개일 때 뭉치는 방법?
// bucket 이라는 reducer 하나니까.. 지금은 어떻게 넘겨주는 건지만 알자!
const rootReducer = combineReducers({ bucket });

const store = createStore(rootReducer, enhancer);

export default store;
