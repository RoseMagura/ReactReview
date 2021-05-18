import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store";
import { toggleActive } from '../actions/active';
import { selectBreak } from './BreakLength';
import { selectSession } from './SessionLength';
import { useEffect, useState } from 'react';

const selectActive = (state: RootState) => state.active;

const Active = () => {
    const { activeType } = useSelector(selectActive);
    const breakLength = useSelector(selectBreak).length;
    const sessionLength = useSelector(selectSession).length;

    const [displayString, setDisplay] = useState('');
    const [running, toggleRunning] = useState(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout>();

    const [currLength, setCurrLength] = useState(5); // TODO: Update this later
    const dispatch = useDispatch();

    useEffect(() => {
        activeType === 'Session'
            ? setDisplay(`${sessionLength}:00`)
            : setDisplay(`${breakLength}:00`);
    }, [activeType]);

    const toggle = () => {
        activeType === 'Session'
            ? dispatch(toggleActive('Break'))
            : dispatch(toggleActive('Session'));
    }

    const reset = () => {
        console.log('resetting');
    }

    const startStop = () => {
        if (running) {
            if (timerId !== undefined) {
                clearInterval(timerId);
            }
        } else {
            let count = 1;
            const timer = setInterval(() => {
                let localLen = currLength - count;
                // setDisplay(`${currLength}`);
                setCurrLength(localLen);
                count++;
            }, 1000);
            setTimerId(timer);
        }
        toggleRunning(!running);
    }

    // Stop automatically when session or break reaches 0
    // TODO: Make sure 0:00
    if(currLength === 0){
        timerId !== undefined && clearInterval(timerId);
        // TODO: Play Sound here 
        // TODO: Start new break or session accordingly
    }

    return (
        <div>
            <h2>{activeType}</h2>
            <h2>{currLength}</h2>
            <button id='start_stop' onClick={startStop}>Play / Pause</button>
            <div>{running && 'Running'}</div>
            <button id='reset' onClick={reset}>Reset</button>
            <button onClick={toggle}>Toggle Session / Break</button>
        </div>
    )
}
export default Active;