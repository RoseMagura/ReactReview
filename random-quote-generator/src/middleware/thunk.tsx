import { CHANGE_QUOTE } from "../actions/quotes";
import { AppDispatch } from "../store";

export const apiUrl = process.env.REACT_APP_API_URL;

export const fetchQuote = async (dispatch: AppDispatch) => {
    apiUrl === undefined 
        ? console.log('Issue with fetching')
        : fetch('http://localhost:8080/random').then(async res => 
            res.json()).then(data => dispatch({
                type: CHANGE_QUOTE,
                payload: data}));
}