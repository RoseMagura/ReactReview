import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store";
import { increaseBreak, decreaseBreak } from '../actions/break';

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
            <button onClick={increment} id='break-increment'>Increment</button>
            <button onClick={decrement} id='break-decrement'>Decrement</button>
        </div>
    )
}
export default BreakLength;