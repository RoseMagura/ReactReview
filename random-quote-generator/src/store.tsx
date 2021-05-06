import { createStore, applyMiddleware } from 'redux';
import combineReducers from './reducers/index';
import thunkMiddleware from 'redux-thunk';
import logger from "redux-logger";

export const store = createStore(combineReducers, applyMiddleware(logger, thunkMiddleware));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;