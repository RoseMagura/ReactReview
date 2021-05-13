import { rootReducer } from "./reducers/reducer";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

const store = createStore(rootReducer, applyMiddleware(logger));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
