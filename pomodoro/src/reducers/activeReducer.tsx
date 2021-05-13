import { PayloadAction } from '@reduxjs/toolkit';

export const activeReducer = (state = {}, action: PayloadAction) => {
    switch (action.type) {
        default:
            return state;
    }
};