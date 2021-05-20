export const INCREMENT_BREAK = 'INCREMENT_BREAK';
export const DECREMENT_BREAK = 'DECREMENT_BREAK';
export const RESTORE_DEFAULT_BREAK = 'RESTORE_DEFAULT_BREAK';

export const increaseBreak = () => {
    return {
        type: INCREMENT_BREAK
    };
}

export const decreaseBreak = () => {
    return {
        type: DECREMENT_BREAK
    };
}

export const restoreDefaultBreak = () => {
    return {
        type: RESTORE_DEFAULT_BREAK
    }
}