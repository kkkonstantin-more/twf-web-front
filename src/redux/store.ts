import { createStore, applyMiddleware } from "redux";

import rootReducer from "./root-reducer";

import logger from "redux-logger";
import thunk from "redux-thunk";

const middlewares: any[] = [thunk];
if (process.env.NODE_ENV === "development") middlewares.push(logger);

// setting up redux
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
