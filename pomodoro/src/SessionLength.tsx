import { useState } from 'react';

const SessionLength = () => {
    const [sessionLen, setLen] = useState(25);

    const increment = () => {
        if (sessionLen < 60) {
            setLen(sessionLen + 1);
        }
    }

    const decrement = () => {
        if (sessionLen > 1) {
            setLen(sessionLen - 1);
        }
    }
    return (
        <div>
            <h2 id='session-label'>Session Length</h2>
            <div id='session-length'>{sessionLen}</div><br />
            <button onClick={increment} id='session-increment'>Increment</button>
            <button onClick={decrement} id='session-decrement'>Decrement</button>
        </div>
    )
}
export default SessionLength;