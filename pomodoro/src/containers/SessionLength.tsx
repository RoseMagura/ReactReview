import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store";
import { increaseSession, decreaseSession } from '../actions/session';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

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
            <KeyboardArrowUpIcon onClick={increment} id='session-increment'
                className='icon' style={{fontSize: '40px'}}/>
            <KeyboardArrowDownIcon onClick={decrement} id='session-decrement'
                className='icon' style={{fontSize: '40px'}}/>
        </div>
    )
}

export default SessionLength;