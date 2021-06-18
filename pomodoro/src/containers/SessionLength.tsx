import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store";
import { increaseSession, decreaseSession } from '../actions/session';

export const selectSession = (state: RootState) => state.session;

const SessionLength = () => {
    const sessionLen = useSelector(selectSession).length;
    const dispatch = useDispatch();

    const increment = () => {
        if (sessionLen < 60) {
            dispatch(increaseSession());
        }
    }

    const decrement = () => {
        if (sessionLen > 1) {
            dispatch(decreaseSession());
        }
    }
    return (
        <div>
            <h2 id='session-label'>Session Length</h2>
            <div id='session-length'>{sessionLen}</div><br />
            <button onClick={increment} id='session-increment'>Increment</button>
            <button onClick={decrement} id='session-decrement'>Decrement</button>
        </div>
    )
}

export default SessionLength;