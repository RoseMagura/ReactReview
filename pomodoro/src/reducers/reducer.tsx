import { PayloadAction } from '@reduxjs/toolkit';

export const rootReducer = (state = {}, action: PayloadAction) => {
    switch (action.type) {
        default:
            return state;
    }
};