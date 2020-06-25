import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger];

// setting up redux
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
