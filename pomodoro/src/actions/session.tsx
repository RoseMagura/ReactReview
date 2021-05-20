export const INCREMENT_SESSION = 'INCREMENT_SESSION';
export const DECREMENT_SESSION = 'DECREMENT_SESSION';
export const RESTORE_DEFAULT_SESSION = 'RESTORE_DEFAULT_SESSION';

export const increaseSession = () => {
    return {
        type: INCREMENT_SESSION
    };
}

export const decreaseSession = () => {
    return { 
        type: DECREMENT_SESSION
    };
}

export const restoreDefaultSession = () => {
    return {
        type: RESTORE_DEFAULT_SESSION
    }
}