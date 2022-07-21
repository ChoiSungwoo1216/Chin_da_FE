import { Howl } from "howler";

function effectSound(src, volume) {
  let sound;
  const soundInject = (src) => {
    sound = new Howl({ src: [`${src}`] });
    sound.volume(volume);
  };
  soundInject(src);
  return sound;
}

export default effectSound;
