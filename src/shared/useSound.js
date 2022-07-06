import { useEffect } from 'react'
import { Howl } from 'howler';
// 커스텀 훅
function useSound(src, volume, fadeoutTime, mute) {
    let sound;
    const soundStop = () => sound.stop();
    const soundPlay = (src) => {
        sound = new Howl({ src });
        sound.volume(volume);
        sound.mute(mute)
        sound.play();
    }

    useEffect(() => {
        soundPlay(src);
        sound.on('play', () => {
            const fadeouttime = fadeoutTime;
            setTimeout(() => sound.fade(volume, 0, fadeouttime), (sound.duration() - sound.seek()) * 1000 - fadeouttime);
        });
        return soundStop;
    }, [mute, volume]);
}

export default useSound;