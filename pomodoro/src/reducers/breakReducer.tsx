import { INCREMENT_BREAK, DECREMENT_BREAK } from '../actions/break';
import { Action, Reducer } from 'redux';

interface BreakState {
    length: number;
}

export const breakReducer: Reducer<BreakState> = (state = { length: 5 }, action: Action) => {
    switch (action.type) {
        case INCREMENT_BREAK:
            return {
                ...state,
                length: state.length + 1
            };
        case DECREMENT_BREAK:
            return {
                ...state,
                length: state.length - 1
            };
        default:
            return state;
    }
};