import { combineReducers } from 'redux';
import { activeReducer } from './activeReducer';
import { sessionReducer } from './sessionReducer';
import { breakReducer } from './breakReducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    active: activeReducer,
    break: breakReducer
});

export default rootReducer;