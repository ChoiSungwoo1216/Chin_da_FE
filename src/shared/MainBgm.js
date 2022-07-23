import React from "react";
import { useSelector } from "react-redux";
import useSound from "./useSound";
import mainbgm from "../audios/mainTheme.mp3";
import startbgm from "../audios/main_bgm.mp3"


export const MainB = (props) => {
    const volume = useSelector((state) => state.user.sound);
    const mbmute = props.mbmute
    useSound(mainbgm, volume.bgm, mbmute);

    return (
        <>
        </>
    )
}

export const MainA = (props) => {
    const volume = useSelector((state) => state.user.sound);
    const mMute = props.mMute
    useSound(startbgm, volume.bgm, mMute);

    return (
        <>
        </>
    )
}
