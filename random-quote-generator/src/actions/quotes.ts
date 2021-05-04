import { Quote } from "../interfaces/Quote";
import { Action } from '../interfaces/Action';

export const CHANGE_QUOTE = 'CHANGE_QUOTE';

export const changeQuote = (quote: Quote): Action => {
    return {
        type: CHANGE_QUOTE,
        payload: quote
    };
}