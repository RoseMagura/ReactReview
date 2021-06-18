import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleActive } from '../actions/active';
import { selectBreak } from './BreakLength';
import { selectSession } from './SessionLength';
import { useEffect, useState } from 'react';
import { restoreDefaultSession } from '../actions/session';
import { restoreDefaultBreak } from '../actions/break';
import SoundPlayer from './SoundPlayer';
import accurateInterval from 'accurate-interval';

export const selectActive = (state: RootState) => state.active;

const Active = () => {
    const { activeType } = useSelector(selectActive);
    const breakLength = useSelector(selectBreak).length;
    const sessionLength = useSelector(selectSession).length;
    // const sessionLength = .5; // FOR DEVELOPMENT ONLY
    // const breakLength = .5;// FOR DEVELOPMENT ONLY
  
    const [displayString, setDisplayString] = useState('');
    const [running, setRunning] = useState(false);
    const [timerId, setTimerId] = useState<any>(); // TODO: EDIT HERE
    const [currLength, setCurrLength] = useState(1500);
    const [isFirstSession, setIsFirstSession] = useState(true);
    const [prevVal, setPrevVal] = useState<number>();

    const dispatch = useDispatch();

    const setUp = () => {
        if (activeType === 'Session') {
            setCurrLength(sessionLength * 60); // in seconds
            if (sessionLength < 10) {
                setDisplayString(`0${sessionLength}:00`);
            } else {
                setDisplayString(`${sessionLength}:00`);
            }
        } else {
            if (breakLength < 10) {
                setDisplayString(`0${breakLength}:00`);
            } else {
                setDisplayString(`${breakLength}:00`);
            }
            setCurrLength(breakLength * 60);
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
            timerId.clear();
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
        if (minutes < 10) {
            formattedString = `0${minutes}:`;
        }
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
                timerId.clear();
            }
        } else {
            let count = 1;
            const accurateTimer = accurateInterval(() => {
                const localLen = currLength - count;
                if (localLen < 10) {
                    setDisplayString(`00:0${localLen}`);
                } else if (localLen < 60) {
                    setDisplayString(`00:${localLen}`);
                } else {
                    setDisplayString(`${convertSeconds(localLen)}`);
                }
                setCurrLength(localLen);
                setPrevVal(localLen + 1);
                count++;
            }, 1000, {aligned: true, immediate: true});
            setTimerId(accurateTimer);
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
        if (prevVal === 0) {
            timerId.clear();
            // Signal to start playing sound clip
            play();
            if (timerId !== undefined) {
                clearInterval(timerId);
            }
            // Start new break or session accordingly
            setRunning(true);
            if (activeType === 'Session') {
                setCurrLength(breakLength * 60);
                setDisplayString(`${breakLength}:00`);
                dispatch(toggleActive('Break'));
                setPrevVal(breakLength * 60);
            } else {
                setCurrLength(sessionLength * 60);
                setDisplayString(`${sessionLength}:00`);
                dispatch(toggleActive('Session'));
                setPrevVal(sessionLength * 60);
            }
        }
    }, [prevVal]);

    // useEffect(() => {
    //     // const time = convertSeconds(currLength);
    //     // setDisplayString(time);

    //     if(currLength === 0){
    //         console.log('PLAYING');
    //         // Signal to start playing sound clip
    //         play();
    //     // }

    //     // if (currLength < 0) {
    //         console.log('switching');
    //         if (timerId !== undefined) {
    //             timerId.clear();
    //         }
    //         // Start new break or session accordingly
    //         setRunning(true);
    //         if (activeType === 'Session') {
    //             setCurrLength(breakLength * 60);
    //             setDisplayString(`${breakLength}:00`);
    //             dispatch(toggleActive('Break'));
    //         } else {
    //             setCurrLength(sessionLength * 60);
    //             setDisplayString(`${sessionLength}:00`);
    //             dispatch(toggleActive('Session'));
    //         }
    //     }
    // }, [currLength]);

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
            <h2>{currLength}</h2>
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
