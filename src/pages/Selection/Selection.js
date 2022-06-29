import React from "react";
import styled from "styled-components"
import Language from "./components/Language";
import Level from "./components/Level";
import Room from "./components/Room"
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

const Selection = () => {
    const [language, setLanguage] = React.useState("");
    const [level, setLevel] = React.useState("");

    const [lanOn, setLanOn] = React.useState(true);
    const [levOn, setLevOn] = React.useState(false);
    const [roomOn, setRoomOn] = React.useState(false);


    return (
        <Body>
            {lanOn ? (<Language setLanguage={setLanguage} setLanOn={setLanOn} setLevOn={setLevOn} />) : (null)}
            {levOn ? (<Level language={language} setLevel={setLevel} setLanOn={setLanOn} setLevOn={setLevOn} setRoomOn={setRoomOn}/>) : (null)}
            {roomOn ? (<Room language={language} level={level} setLanOn={setLanOn} setLevOn={setLevOn} setRoomOn={setRoomOn}/>):(null)}
        </Body>
    )
}

const Body = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
`;

export default Selection;