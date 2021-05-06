import { useSelector, useDispatch } from 'react-redux';
import { fetchQuote } from '../middleware/thunk';
import { RootState } from '../store';

export const selectQuote = (state: RootState) => state.quote;

export const Quote = () => {
    const dispatch = useDispatch();
    const initialQuote = useSelector(selectQuote);

    const pickNew = () => {
        fetchQuote(dispatch);
    }

    return (
        <div id='quote-box'>
            <h2 id='text'>{initialQuote.text}</h2>
            <h3 id='author'>{initialQuote.author}</h3>
            <button>
                <a id='tweet-quote' rel='noreferrer' href='https:/twitter.com/intent/tweet' target='_blank'>
                    Tweet
                </a>
            </button>

            <button id='new-quote' onClick={pickNew}>New Quote</button>

        </div>
    );

}