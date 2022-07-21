import effectSound from "./effectSound";
import selectSound from "../audios/btnselect.mp3"
import hoverSound from "../audios/BtnHoverSE1.mp3"
import enterSound from "../audios/SelectionRoomClickSE1.mp3"

import MainSelectSound from '../audios/MainCardSelectSE1.mp3';
import MainEnterSound from '../audios/MainStartSE1.mp3';

//Selection, Main
export const hoverEs = (volume) =>{
    effectSound(hoverSound, volume);
}
//Selection
export const selectEs = (volume) =>{
     effectSound(selectSound, volume);
}
export const enterEs = (volume) =>{
    effectSound(enterSound, volume);
}
//Main
export const MainSelect = (volume) =>{
    effectSound(MainSelectSound, volume);
}
export const MainEnter = (volume) =>{
    effectSound(MainEnterSound, volume);
}