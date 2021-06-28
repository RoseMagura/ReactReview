import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store";
import { increaseBreak, decreaseBreak } from '../actions/break';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

export const selectBreak = (state: RootState) => state.break;

const BreakLength = () => {
    const { length } = useSelector(selectBreak);
    const dispatch = useDispatch();

    const increment = () => {
        if (length < 60) {
            dispatch(increaseBreak());
        }
    }

    const decrement = () => {
        if (length > 1) {
            dispatch(decreaseBreak());
        }
    }

    return (
        <div>
            <h2 id='break-label'>Break Length</h2>
            <div id='break-length'>{length}</div><br />
            <KeyboardArrowUpIcon onClick={increment} id='session-increment' 
                className='icon' style={{fontSize: '40px'}}/>
            <KeyboardArrowDownIcon onClick={decrement} id='session-decrement' 
                className='icon' style={{fontSize: '40px'}}/>
        </div>
    )
}

export default BreakLength;