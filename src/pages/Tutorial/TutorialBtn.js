import React from "react"
import styled from "styled-components"
import Tutorial from "./Tutorial"
import effectSound from "../../shared/effectSound"
import hoverSound from "../../audios/BtnHoverSE1.mp3"
import { useSelector } from "react-redux"

const TutorialBtn = () => {
   const userSound = useSelector((state) => state.user.sound);

    const [tutoOpen, setTutoOpen] = React.useState(false);
    const open = () => {
        setTutoOpen(true);
    }
   const hoverEs = effectSound(hoverSound, userSound.es)

    return (
        <div>
            {tutoOpen ? (<Tutorial setTutoOpen={setTutoOpen}/>) : (
            <TutoBtn src="/img/question_btn_black.png" onClick={open} onMouseOver={()=>hoverEs.play()}/>
            )}
        </div>
    )
}

const TutoBtn = styled.img`
position: fixed;
right: 30px;
bottom: 20px;
width: 30px;
height: 30px;
z-index: 10;
:hover{
    content: url(/img/question_btn_white.png);
}
`;

export default TutorialBtn