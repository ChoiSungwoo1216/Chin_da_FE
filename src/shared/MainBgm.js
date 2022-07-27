import React from "react";
import { useSelector } from "react-redux";
import useSound from "./useSound.js";
import mainbgm from "../audios/mainTheme.mp3";
import startbgm from "../audios/main_bgm.mp3"

export const MainA = (props) => {
    const volume = useSelector((state) => state.user.sound.bgm);
    const mMute = props.mMute
    useSound(startbgm, volume, mMute);

    return (
        <>
        </>
    )
}

export const MainB = (props) => {
    const volume = useSelector((state)=>state.user.sound.bgm)
    const mbmute = props.mbmute
    useSound(mainbgm, volume, mbmute);

    return (
        <>
        </>
    )
}


