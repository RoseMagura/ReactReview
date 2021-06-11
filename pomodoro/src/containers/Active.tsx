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
    const [timerId, setTimerId] = useState<number>();
    const [currLength, setCurrLength] = useState(1500);
    const [isFirstSession, setIsFirstSession] = useState(true);

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

    // Reset the timer and return to defaults 
    const reset = () => {
        dispatch(restoreDefaultBreak());
        dispatch(restoreDefaultSession());
        dispatch(toggleActive('Session'));
        setIsFirstSession(true);
        setCurrLength(1500);
        setDisplayString('25:00'); // Reset should return to 25:00 regardless of active type
        setRunning(false); // timer is paused after resetting
        if (timerId !== undefined) {
            clearInterval(timerId);
        }
        const player = document.getElementById('beep') as HTMLAudioElement;
        player?.load(); // prepare audio for next session
    };

    // lets button switch between session or break on command
    const toggle = () => {
        reset();
        if (activeType === 'Session') {
            dispatch(toggleActive('Break'));
        } else {
            dispatch(toggleActive('Session'));
        }
    };

    // helper function to take care of converting seconds to a HH:MM string
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

    // Stop the timer if it's running, or start it if it isn't
    const startStop = (clicked?: boolean) => {
        if (clicked && running) {
            setRunning(false);
            if (timerId !== undefined) {
                clearInterval(timerId);
            }
        } else {
            let count = 1;
            const timer = window.setInterval(() => {
                let localLen = currLength - count;
                setCurrLength(localLen);
                if (localLen < 10) {
                    setDisplayString(`00:0${localLen}`);
                } else if (localLen < 60) {
                    setDisplayString(`00:${localLen}`);
                }
                else {
                    setDisplayString(`${convertSeconds(localLen)}`);
                }
                count++;
            }, 10);
            setTimerId(timer);
            setRunning(true);
        }
    };

    // play audio element on page
    const play = () => {
        const player = document.getElementById('beep') as HTMLAudioElement;
        player?.play();
    };

    // Switch between session or break when timer reaches 00:00
    useEffect(() => {
        if (displayString === '00:00') {
            // Signal to start playing sound clip
            play();
            if (timerId !== undefined) {
                clearInterval(timerId);
            }
            // Start new break or session accordingly
            setRunning(true);
            if (activeType === 'Session') {
                setCurrLength(breakLength * 60);
                setTimeout(() => {
                    setDisplayString(`${breakLength}:00`);
                    dispatch(toggleActive('Break'));
                }, 1000);
            } else {
                setCurrLength(sessionLength * 60);
                setTimeout(() => {
                    setDisplayString(`${sessionLength}:00`);
                    dispatch(toggleActive('Session'));
                }, 1000);
            }
        }
    }, [displayString]);

    useEffect(() => {
        console.log(`switching to ${activeType} with length of ${currLength}`);
        // prevent timer from automatically running for first time
        if (!isFirstSession) {
            startStop();
        } else {
            setIsFirstSession(false);
        }
    }, [activeType]);

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
