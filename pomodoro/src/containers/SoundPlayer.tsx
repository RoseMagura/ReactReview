const SoundPlayer = (props: {play: boolean}) => {
    const path = require('../assets/beep.mp3');
    const audio = new Audio(path.default);

    const play = () => {
        audio.play();
    }

    // if (props.play) {
    //     play();
    //     console.log('starting to play');
    // }
    return (
        <div>
            {/* <audio></audio> */}
            <button onClick={play}>Click to Play</button>
        </div>
    )
}

export default SoundPlayer;