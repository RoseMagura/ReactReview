export const INCREMENT_BREAK = 'INCREMENT_BREAK';
export const DECREMENT_BREAK = 'DECREMENT_BREAK';

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