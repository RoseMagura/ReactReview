import { PayloadAction } from '@reduxjs/toolkit';

export const breakReducer = (state = {}, action: PayloadAction) => {
    switch (action.type) {
        default:
            return state;
    }
};