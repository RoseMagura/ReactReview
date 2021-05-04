import { Quote } from "./Quote";

export interface Action {
    type: string;
    payload: Quote;
}