import React from "react";
import { useSelector } from "react-redux";
import useSound from "./useSound";
import mainbgm from "../audios/mainTheme.mp3";


const MainB = (props) => {
    const volume = useSelector((state) => state.user.sound);
    const mbmute = props.mbmute
    useSound(mainbgm, volume.bgm, mbmute);

    return (
    <>
    </>
    )
}

export default MainB