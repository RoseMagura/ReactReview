import { PayloadAction } from '@reduxjs/toolkit';
import { INCREMENT_SESSION, DECREMENT_SESSION } from '../actions/session';

export const sessionReducer = (state = { length: 25 }, action: PayloadAction) => {
    switch (action.type) {
        case INCREMENT_SESSION:
            return {
                ...state,
                length: state.length + 1
            };
        case DECREMENT_SESSION:
            return {
                ...state,
                length: state.length - 1
            };
        default:
            return state;
    }
};