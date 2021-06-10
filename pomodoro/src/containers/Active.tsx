import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
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

    const [displayString, setDisplayString] = useState('');
    const [running, setRunning] = useState(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout>();
    const [currLength, setCurrLength] = useState(25);

    const dispatch = useDispatch();

    const setUp = () => {
        if (activeType === 'Session') {
            setCurrLength(sessionLength * 60); // in seconds
            setDisplayString(`${sessionLength}:00`);
        } else {
            setCurrLength(breakLength * 60);
            setDisplayString(`${breakLength}:00`);
        }
    };

    useEffect(setUp, [activeType, sessionLength, breakLength]);

    const reset = () => {
        dispatch(restoreDefaultBreak());
        dispatch(restoreDefaultSession());
        dispatch(toggleActive('Session'));
        setDisplayString('25:00'); // Reset should return to 25:00 regardless of active type
        setCurrLength(25);
        setRunning(false); // timer is paused after resetting
        if (timerId !== undefined) {
            clearInterval(timerId);
        }
        const player = document.getElementById('beep') as HTMLAudioElement;
        player?.load(); // prepare audio for next session
    };

    const toggle = () => {
        reset();
        if (activeType === 'Session') {
            dispatch(toggleActive('Break'));
        } else {
            dispatch(toggleActive('Session'));
        }
    };

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
    };

    const startStop = (clicked?: boolean) => {
        if (clicked && running) {
            console.log('pausing');
            if (timerId !== undefined) {
                clearInterval(timerId);
            }
        } else {
            console.log('starting');
            let count = 0;
            const timer = setInterval(() => {
                let localLen = currLength - count;
                setCurrLength(localLen);
                if (localLen < 10) {
                    setDisplayString(`00:0${localLen}`);
                } else if (localLen < 60) {
                    setDisplayString(`00:${localLen}`);
                } else {
                    setDisplayString(`${convertSeconds(localLen)}`);
                }
                count++;
            }, 1000);
            setTimerId(timer);
        }
        setRunning(!running);
    };

    const play = () => {
        const player = document.getElementById('beep') as HTMLAudioElement;
        player?.play();
    };

    // Stop automatically when session or break reaches 00:00
    useEffect(() => {
        if (displayString === '00:00') {
            // Signal to start playing sound clip
            play();
            if (timerId !== undefined) {
                clearInterval(timerId);
            }
            // Start new break or session accordingly
            if (activeType === 'Session') {
                setDisplayString(`${breakLength}:00`);
                dispatch(toggleActive('Break'));
                console.log('switching to break');
                setRunning(false);
                startStop();
            } else {
                console.log('starting to switch');
                setDisplayString(`${sessionLength}:00`);
                dispatch(toggleActive('Session'));
                console.log('switching to session');
                startStop();
            }
        }
    }, [displayString]);

    return (
        <div>
            <h2 id="timer-label">{activeType}</h2>
            <h2 id="time-left">{displayString}</h2>
            <button id="start_stop" onClick={() => startStop(true)}>
                Play / Pause
            </button>
            <button id="reset" onClick={reset}>
                Reset
            </button>
            <button onClick={toggle}>Toggle Session / Break</button>
            <SoundPlayer />
        </div>
    );
};
export default Active;
