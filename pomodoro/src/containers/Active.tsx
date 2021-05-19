import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store";
import { toggleActive } from '../actions/active';
import { selectBreak } from './BreakLength';
import { selectSession } from './SessionLength';
import { useEffect, useState } from 'react';
import SoundPlayer from './SoundPlayer';

const selectActive = (state: RootState) => state.active;

const Active = () => {
    const path = require('../assets/beep.mp3');

    const { activeType } = useSelector(selectActive);
    const breakLength = useSelector(selectBreak).length;
    const sessionLength = useSelector(selectSession).length;

    const [displayString, setDisplay] = useState('');
    const [running, toggleRunning] = useState(false);
    const [timerId, setTimerId] = useState<NodeJS.Timeout>();
    const [currLength, setCurrLength] = useState(25);
    const [playSound, setPlay] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (activeType === 'Session') {
            setCurrLength(sessionLength * 60); // in seconds
        } else {
            setCurrLength(breakLength * 60);
        }
    }, [activeType, sessionLength, breakLength]);

    useEffect(() => {
        setDisplay(convertSeconds(currLength));
    }, [currLength]);

    const reset = () => {
        if (activeType === 'Session') {
            setCurrLength(sessionLength * 60); // in seconds
        } else {
            setCurrLength(breakLength * 60);
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
                setCurrLength(localLen);
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

    // Stop automatically when session or break reaches 0
    // TODO: Make sure 0:00
    if (currLength === 0) {
        console.log('reached zero');
        timerId !== undefined && clearInterval(timerId);
        // Signal to start playing sound clip
        play();

        console.log('playing sound here');
        // TODO: Start new break or session accordingly
    }

    useEffect(() => setPlay(true), []);
    return (
        <div>
            <h2 id='timer-label'>{activeType}</h2>
            <h2 id='time-left'>{displayString}</h2>
            <button id='start_stop' onClick={startStop}>Play / Pause</button>
            <button id='reset' onClick={reset}>Reset</button>
            <button onClick={toggle}>Toggle Session / Break</button>
            <SoundPlayer play={playSound} />
            {/* <audio id='beep' src={path.default} controls /> */}
        </div>
    )
}
export default Active;