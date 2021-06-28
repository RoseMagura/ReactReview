import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleActive, restoreDefaultActiveType } from '../actions/active';
import { selectBreak } from './BreakLength';
import { selectSession } from './SessionLength';
import { useEffect, useState, useRef } from 'react';
import { restoreDefaultSession } from '../actions/session';
import { restoreDefaultBreak } from '../actions/break';
import SoundPlayer from './SoundPlayer';
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

export const selectActive = (state: RootState) => state.active;

// helper function to take care of converting seconds to a HH:MM string
const formatTime = (seconds: number) => {
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

const Active = () => {
    const { activeType } = useSelector(selectActive);
    const breakLength = useSelector(selectBreak).length;
    const sessionLength = useSelector(selectSession).length;
    const timerRef = useRef<number>();
    const [secondsLeft, setSecondsLeft] = useState(1500);
    const [shouldStart, setShouldStart] = useState(false);

    const dispatch = useDispatch();
    const defaultSecondsLeft = sessionLength * 60;

    const start = () => {
        const player = document.getElementById('beep') as HTMLAudioElement;
        player?.load(); // prepare audio for next session

        timerRef.current = window.setInterval(() => {
            setSecondsLeft((s) => Math.max(0, s - 1));
        }, 1000);
    }

    const stop = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = undefined;
    }

    useEffect(() => {
        // Ensure that one can't change length while timer is running
        if (timerRef.current === undefined) {
            console.log('altering time');
            if (activeType === 'Session') {
                setSecondsLeft(sessionLength * 60);
            } else {
                setSecondsLeft(breakLength * 60);
            }
        }

        if (shouldStart) {
            setShouldStart(false);
            start();
        }
    }, [activeType, sessionLength, breakLength, shouldStart]);

    // Reset the timer and return to defaults
    const reset = () => {
        stop();
        dispatch(restoreDefaultBreak());
        dispatch(restoreDefaultSession());
        dispatch(restoreDefaultActiveType());
        setSecondsLeft(defaultSecondsLeft);
        const player = document.getElementById('beep') as HTMLAudioElement;
        player?.load(); // prepare audio for next session
    };

    // lets button switch between session or break on command
    const toggle = () => {
        stop();
        dispatch(toggleActive());
    };

    // to switch between session and break
    useEffect(() => {
        if (secondsLeft !== 0) return;
        const player = document.getElementById('beep') as HTMLAudioElement;
        player?.play();

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        setTimeout(() => {
            setShouldStart(true);
            dispatch(toggleActive());
            if (activeType === 'Session') {
                setSecondsLeft(breakLength * 60);
            } else {
                setSecondsLeft(sessionLength * 60);
            }
        }, 1000);
    }, [secondsLeft, dispatch]);

    return (
        <div>
            <h2 id="timer-label">{activeType}</h2>
            <h2 id="time-left">{formatTime(secondsLeft)}</h2>
            <PlayCircleOutlineIcon
                className='icon'
                style={{fontSize: '40px'}}
                id="start_stop" onClick={() => {
                    if (typeof timerRef.current === 'number') {
                        stop();
                    } else {
                        start();
                    }
                }}>
            </PlayCircleOutlineIcon>
            <RefreshIcon id='reset' onClick={reset} className='icon' 
                style={{fontSize: '40px'}} /><br/>
            <Button onClick={toggle} style={{ color: 'white', fontSize: '20px' }}>
                Toggle Session / Break</Button>
            <SoundPlayer />
        </div>
    );
};
export default Active;
