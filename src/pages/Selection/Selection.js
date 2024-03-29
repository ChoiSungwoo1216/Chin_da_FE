import React from "react";
import styled from "styled-components"
import Language from "./components/Language";
import Level from "./components/Level";
import Room from "./components/Room"
import { useSelector } from "react-redux";
import effectSound from "../../shared/effectSound.js";
import selectSound from "../../audios/btnselect.mp3"
import hoverSound from "../../audios/BtnHoverSE1.mp3"
import enterSound from "../../audios/SelectionRoomClickSE1.mp3"
const Selection = ({ logout }) => {
   const userSound = useSelector((state) => state.user.sound);

   const [language, setLanguage] = React.useState("");
   const [level, setLevel] = React.useState("");

   const [lanOn, setLanOn] = React.useState(true);
   const [levOn, setLevOn] = React.useState(false);
   const [roomOn, setRoomOn] = React.useState(false);

   const es = effectSound(selectSound, userSound.es);
   const hoverEs = effectSound(hoverSound, userSound.es);
   const enterEs = effectSound(enterSound, userSound.es);

   window.onbeforeunload = (e) => {
      e.preventDefault();
      e.returnValue = "";
      return logout();
   };

   return (
      <>
         <RoundContainer>
            <Round1 />
            <Round2 />
         </RoundContainer>
         <Body>
            {lanOn ? (
               <Language
                  setLanguage={setLanguage}
                  setLanOn={setLanOn}
                  setLevOn={setLevOn}
                  es={es}
                  hoverEs={hoverEs}
               />
            ) : null}
            {levOn ? (
               <Level
                  language={language}
                  setLevel={setLevel}
                  setLanOn={setLanOn}
                  setLevOn={setLevOn}
                  setRoomOn={setRoomOn}
                  es={es}
                  hoverEs={hoverEs}
               />
            ) : null}
            {roomOn ? (
               <Room
                  language={language}
                  level={level}
                  setLanOn={setLanOn}
                  setLevOn={setLevOn}
                  setRoomOn={setRoomOn}
                  es={es}
                  hoverEs={hoverEs}
                  enterEs={enterEs}
               />
            ) : null}
         </Body>
      </>
   );
}

const RoundContainer = styled.div`
   overflow-x: hidden;
   overflow-y: hidden;
`;

const Round1 = styled.div`
   position: absolute;
   top: 5%;
   left: 20%;
   width: 10vw;
   height: 10vw;
   border-radius: 50%;
   box-shadow: 0 0 40px #d84869;
   background: linear-gradient(-26deg, #d84869, #f46641);
   animation: cloudOrbit1 50s linear infinite;
`;

const Round2 = styled.div`
   position: absolute;
   top: 40%;
   right: 15%;
   width: 20vw;
   height: 20vw;
   border-radius: 50%;
   box-shadow: 0 0 50px #5622ff;
   background: linear-gradient(-180deg, #5622ff, #4190fd);
   animation: cloudOrbit2 90s linear infinite;
`;

const Body = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
overflow-y: hidden;
overflow-x: hidden;
`;

export default Selection;