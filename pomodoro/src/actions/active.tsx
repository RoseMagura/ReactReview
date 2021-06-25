export const SWITCH_ACTIVE = 'SWITCH_ACTIVE';
export const RESTORE_DEFAULT_ACTIVE = 'RESTORE_DEFAULT_ACTIVE';

export const toggleActive = () => {
    return {
        type: SWITCH_ACTIVE
    };
};

export const restoreDefaultActiveType = () => {
    return {
        type: RESTORE_DEFAULT_ACTIVE
    };
};
