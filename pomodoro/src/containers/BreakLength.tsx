import { useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from "../store";

const selectBreak = (state: RootState) => state.break;

const BreakLength = () => {
    const fromStore = useSelector(selectBreak);
    console.log(fromStore);

    const [breakLen, setLen] = useState(5);

    const increment = () => {
        if (breakLen < 60) {
            setLen(breakLen + 1);
        }
    }

    const decrement = () => {
        if (breakLen > 1) {
            setLen(breakLen - 1);
        }
    }

    return (
        <div>
            <h2 id='break-label'>Break Length</h2>
            <div id='break-length'>{breakLen}</div><br />
            <button onClick={increment} id='break-increment'>Increment</button>
            <button onClick={decrement} id='break-decrement'>Decrement</button>
        </div>
    )
}
export default BreakLength;