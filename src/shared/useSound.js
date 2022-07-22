import { useEffect } from 'react'
import { Howl } from 'howler';
// 커스텀 훅
function useSound(src, volume, mute) {
    let sound;
    const soundStop = () => sound.stop();
    const soundPlay = (src) => {
        sound = new Howl({ src });
        sound.volume(volume);
        sound.mute(mute)
        sound.play();
        sound.loop(true);
    }

    useEffect(() => {
        soundPlay(src);
        return soundStop;
    }, [mute, volume]);
}

export default useSound;