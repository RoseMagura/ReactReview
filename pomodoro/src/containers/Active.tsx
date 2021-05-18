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
    const [currLength, setCurrLength] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        if (activeType === 'Session') {
            setCurrLength(sessionLength * 60); // in seconds
            // setDisplay(`${sessionLength}:00`);
        } else {
            setCurrLength(breakLength * 60);
            // setDisplay(`${breakLength}:00`)
        }
    }, [activeType, sessionLength, breakLength]);

    useEffect(() => {
        setDisplay(`${currLength}`);
    }, [currLength]);

    const reset = () => {
        console.log('resetting');
        if (activeType === 'Session') {
            setCurrLength(sessionLength * 60); // in seconds
            // setDisplay(`${sessionLength}:00`);
        } else {
            setCurrLength(breakLength * 60);
            // setDisplay(`${breakLength}:00`)
        }
        toggleRunning(!running);
        timerId !== undefined && clearInterval(timerId);
    }

    const toggle = () => {
        reset();
        activeType === 'Session'
            ? dispatch(toggleActive('Break'))
            : dispatch(toggleActive('Session'));
    }

    const convertSeconds = (seconds: number) => {
        const minutes = seconds / 60;
        const remainingSec = seconds % 60;
        console.log(minutes, remainingSec);
        let formattedString = `${minutes}:`;
        if (remainingSec < 10) {
            formattedString += `0${remainingSec}`;
        } else {
            formattedString += `${remainingSec}`;
        }
        return formattedString;
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
                setCurrLength(localLen);
                count++;
            }, 1000);
            setTimerId(timer);
        }
        toggleRunning(!running);
    }

    // Stop automatically when session or break reaches 0
    // TODO: Make sure 0:00
    if (currLength === 0) {
        timerId !== undefined && clearInterval(timerId);
        // TODO: Play Sound here 
        // TODO: Start new break or session accordingly
    }

    return (
        <div>
            <h2>{activeType}</h2>
            <h2>{displayString}</h2>
            <h2>{currLength}</h2>
            <button id='start_stop' onClick={startStop}>Play / Pause</button>
            <button id='reset' onClick={reset}>Reset</button>
            <button onClick={toggle}>Toggle Session / Break</button>
            <div>{running && 'Running'}</div>
        </div>
    )
}
export default Active;