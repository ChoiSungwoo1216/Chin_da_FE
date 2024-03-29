import React from "react"
import styled from "styled-components"
import SoundSetting from "./SoundSetting.js"
import effectSound from "./effectSound.js"
import hoverSound from "../audios/BtnHoverSE1.mp3"
import { useSelector } from "react-redux"

const SoundSettingBtn = () => {
   const userSound = useSelector((state) => state.user.sound);

   const [setting, setSetting] = React.useState(false);
   const openSetting = () => {
      setSetting(true);
   }
   const hoverEs = effectSound(hoverSound, userSound.es)

    return (
        <div>
             {setting ? (<SoundSetting setSetting={setSetting} />) :
               <SoundBtn onClick={openSetting} src={"/img/setting_black.svg"} alt="" onMouseOver={() =>hoverEs.play()} />
            }
        </div>
    )
}

const SoundBtn = styled.img`
position : fixed;
z-index: 10;
bottom: 5vh;
right: 0.5vw;
width: calc(1vh + 1vw);
height: calc(1vh + 1vw);
&:hover{
   content: url(/img/setting_white.svg);
}
`;

export default SoundSettingBtn