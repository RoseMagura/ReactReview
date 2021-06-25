import { PayloadAction } from '@reduxjs/toolkit';
import { SWITCH_ACTIVE, RESTORE_DEFAULT_ACTIVE } from '../actions/active';

export const activeReducer = (
    state = { activeType: 'Session' },
    action: PayloadAction
) => {
    switch (action.type) {
        case SWITCH_ACTIVE:
            const prevActive = state.activeType;
            if (prevActive === 'Session') {
                return {
                    activeType: 'Break'
                };
            } else {
                return {
                    activeType: 'Session'
                };
            }
        case RESTORE_DEFAULT_ACTIVE:
            return {
                activeType: 'Session'
            };
        default:
            return state;
    }
};
