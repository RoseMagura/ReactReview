import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store";
import { toggleActive } from '../actions/active';
import { selectBreak } from './BreakLength';
import { selectSession } from './SessionLength';
import { useEffect, useState } from 'react';
import { restoreDefaultSession } from '../actions/session';
import { restoreDefaultBreak } from '../actions/break';
import SoundPlayer from './SoundPlayer';

const selectActive = (state: RootState) => state.active;

const Active = () => {
    const { activeType } = useSelector(selectActive);
    const breakLength = useSelector(selectBreak).length;
    const sessionLength = useSelector(selectSession).length;

    const [displayString, setDisplay] = useState('');
    const [running, toggleRunning] = useState(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout>();
    const [currLength, setCurrLength] = useState(25);

    const dispatch = useDispatch();

    const setUp = () => {
        if (activeType === 'Session') {
            setCurrLength(sessionLength * 60); // in seconds
            setDisplay(`${sessionLength}:00`);
        } else {
            setCurrLength(breakLength * 60);
            setDisplay(`${breakLength}:00`);
        }
    }

    useEffect(setUp, [activeType, sessionLength, breakLength]);

    const reset = () => {
        setDisplay('00:00');
        dispatch(restoreDefaultBreak());
        dispatch(restoreDefaultSession());
        setUp();
        toggleRunning(!running);
        timerId !== undefined && clearInterval(timerId);
        const player = document.getElementById('beep') as HTMLAudioElement;
        player?.load();
    }

    const toggle = () => {
        reset();
        activeType === 'Session'
            ? dispatch(toggleActive('Break'))
            : dispatch(toggleActive('Session'));
    }

    const convertSeconds = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSec = seconds % 60;
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
                // setCurrLength(localLen);
                if (localLen < 10) {
                    setDisplay(`00:0${localLen}`);
                } else if (localLen < 60) {
                    setDisplay(`00:${localLen}`);
                } else {
                    setDisplay(`${convertSeconds(localLen)}`);
                }
                count++;
            }, 1000);

            setTimerId(timer);
        }
        toggleRunning(!running);
    }

    const play = () => {
        const player = document.getElementById('beep') as HTMLAudioElement;
        player?.play();
    }

    // Stop automatically when session or break reaches 0:00
    if (displayString === '00:00') {
        timerId !== undefined && clearInterval(timerId);
        // Signal to start playing sound clip
        play();
        // TODO: Start new break or session accordingly
        if (activeType === 'Session') {
            // setCurrLength(sessionLength * 60); // in seconds
            // setDisplay(`${sessionLength}:00`);
            console.log('switching to break');
        } else {
            // setCurrLength(breakLength * 60);
            // setDisplay(`${breakLength}:00`);
            console.log('switching to session');
        }
    }

    return (
        <div>
            <h2 id='timer-label'>{activeType}</h2>
            <h2 id='time-left'>{displayString}</h2>
            <button id='start_stop' onClick={startStop}>Play / Pause</button>
            <button id='reset' onClick={reset}>Reset</button>
            <button onClick={toggle}>Toggle Session / Break</button>
            <SoundPlayer />
        </div>
    )
}
export default Active;