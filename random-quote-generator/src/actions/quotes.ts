import { Quote } from "../interfaces/Quote";

export const CHANGE_QUOTE = 'CHANGE_QUOTE';

export const changeQuote = (quote: Quote) => {
    return {
        type: CHANGE_QUOTE,
        quote
    };
}