const SoundPlayer = () => {
    const path = require('../assets/beep.mp3');

    return (
        <div>
            <audio id='beep' src={path.default}/>
        </div>
    )
}

export default SoundPlayer;