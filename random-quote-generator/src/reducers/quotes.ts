import { Action } from '../interfaces/Action';
import { CHANGE_QUOTE } from '../actions/quotes';

export const quotes = (state = {}, action: Action) => {
    switch(action.type){
        case CHANGE_QUOTE:        
            return {
                ...action.payload
            };
        default:
            return state;
    }
}