export const SWITCH_ACTIVE = 'SWITCH_ACTIVE';

export const toggleActive = (switchingTo: string) => {
    return {
        type: SWITCH_ACTIVE,
        payload: switchingTo
    };
}