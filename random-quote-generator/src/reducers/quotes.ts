import { Action } from '../interfaces/Action';
import { CHANGE_QUOTE } from '../actions/quotes';
import { Quote } from '../interfaces/Quote';

const initialText = 'If you hear a voice within you say “you cannot paint,” then by all means paint and that voice will be silenced.';
const initialAuthor = 'Vincent Van Gogh';

export const quote = (state = {
    'text': initialText, 'author': initialAuthor
}, action: Action): Quote => {
    switch(action.type){
        case CHANGE_QUOTE:        
            return {
                ...action.payload
            };
        default:
            return state;
    }
}