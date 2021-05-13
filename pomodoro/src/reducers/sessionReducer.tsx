import { PayloadAction } from '@reduxjs/toolkit';

export const sessionReducer = (state = {}, action: PayloadAction) => {
    switch (action.type) {
        default:
            return state;
    }
};