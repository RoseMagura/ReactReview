import { PayloadAction } from '@reduxjs/toolkit';
import { SWITCH_ACTIVE } from '../actions/active';

export const activeReducer = (state = {activeType: 'Session'}, action: PayloadAction) => {
    switch (action.type) {
        case SWITCH_ACTIVE:
            return {
                activeType: action.payload
            }
        default:
            return state;
    }
};