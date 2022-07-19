import React from "react"
import styled, { keyframes } from "styled-components"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import effectSound from '../../../shared/effectSound';
import winSound from '../../../audios/WinSE2.mp3';
import loseSound from '../../../audios/FailSE1.mp3';


const Result = (props) => {
    const userSound = useSelector((state) => state.user.sound);
    const winEs = effectSound(winSound, userSound.es);
    const loseEs = effectSound(loseSound, userSound.es);
    const { setROpen } = props;
    const result = props.result;
    React.useEffect(() => {
        if (result === "WIN") {
            winEs.play();
        } else {
            loseEs.play();
        }
    }, [])
    const navigate = useNavigate();
    const [player, setPlayer] = React.useState("Player 1")
    const GoBackMain = () => {
        navigate("/Selection")
    }
    return (
        <>
            <ResultBackground onClick={() => setROpen(false)} />
            <ResultDiv>
                <SettingWord>RESULT</SettingWord>
                <BlackDiv>
                    <ResultEle>{player} 승리</ResultEle>
                    {(result === "WIN") ?(
                        <ResultLetterDiv>
                            <LetterNoAni src={"/img/W.svg"} alt="" />
                            <LetterAni src={"/img/I.svg"} alt="" />
                            <LetterNoAni src={"/img/N.svg"} alt="" />
                        </ResultLetterDiv>) :(
                        <ResultLetterDiv>
                            <LetterNoAni src={"/img/L.svg"} alt="" />
                            <LetterNoAni src={"/img/O.svg"} alt="" />
                            <LetterNoAni src={"/img/S.svg"} alt="" />
                            <LetterSlopeAni  src={"/img/E.svg"} alt="" />
                        </ResultLetterDiv>)
                    }
                    <ResultElement>한판 더 하시겠습니까?</ResultElement>
                    <ReDiv>
                        <ResultBtn onClick={() => { setROpen(false) }}>Yes</ResultBtn>
                        <ResultBtn onClick={GoBackMain}>No</ResultBtn>
                    </ReDiv>
                </BlackDiv>
            </ResultDiv>
        </>
    )
}
export default Result

const ResultBackground = styled.div`
width: 100%;
height: 100%;
background-color: black;
opacity: 0.5;
position : absolute;
top:0;
left:0;
margin:0;
z-index: 12;
`;
const SettingWord = styled.div`
display: flex;
align-items: center;
justify-content: center;
font-size: calc((2vw + 2vh)/2);
z-index: 12;
color: white;
font-weight: 600;
width: calc(100% - 5px);
height: 10%;
background-color: #5777CE;
border-top : 2px solid #C0CFFF;
border-left : 2px solid #C0CFFF;
border-right : 2px solid #C0CFFF;
border-bottom: 5px solid black;
`;

const ResultDiv = styled.div`
    display: flex;
    flex-direction: column;
    position : absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 12;
    width: 30vw;
    height: 58vh;
    border: 5px solid black;
    color: white;
`;

const BlackDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 5%;
    width: calc(100% - 5px);
    height: 100%;
    border-left : 2px solid #FFFAE3;
    border-right : 2px solid #C1B78E;
    border-bottom: 2px solid #A0935C;
    background-color: #0C1119;
`;

const ResultEle = styled.div`
position: relative;
width: 100%;
height: auto;
line-height: 7vh;
font-size: calc((3vw + 3vh)/2);
font-weight: 600;
text-align: center;
`;

const ResultLetterDiv = styled.div`
display: flex;
flex-direction: row;
gap: 10%;
justify-content: center;
`;

const ReDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 5%;
width: 100%;
height: 10%;
`;

const ResultElement = styled.div`
position: relative;
width: 100%;
font-size: calc((3vw + 3vh)/2 - 10px);
font-weight: 600;
padding: 10px;
text-align: center;
`;

const ResultBtn = styled.div`
position: relative;
width: 20%;
font-size: calc((3vw + 3vh)/2 - 10px);
font-weight: 600;
text-align: center;
padding: 10px;
:hover {
    background-color: white;
    color:#0C1119;
    border: 2px solid #A0935C;
    border-radius: 5px;
    width: calc(20% - 4px);
}
`;

const LetterNoAni = styled.img`
width: calc((5vw + 5vh)/2);
height: calc((5vw + 5vh)/2);
`;

const LetterRotate = keyframes`
0%{
    transform: translateY(0) rotate(0);
}
30%{
    transform: translateY(-20px) rotate(0);
}
40%{
    transform: translateY(-20px) rotate(180deg);
}
50%{
    transform: translateY(-20px) rotate(360deg);
}
80%{
    transform: translateY(0) rotate(360deg);
}
100%{
    transform: translateY(0) rotate(360deg);
}
`;

const LetterAni = styled.img`
width: calc((5vw + 5vh)/2);
height: calc((5vw + 5vh)/2);
animation: ${LetterRotate} 2s linear infinite;
`;

const LetterSlope = keyframes`
0%{
    transform-origin: bottom left;
    transform: translateY(5px) rotate(10deg);
}
40%{
    transform-origin: bottom left;
    transform: translateY(5px) rotate(20deg);
}
60%{
    transform-origin: bottom left;
    transform: translateY(5px) rotate(30deg);
}
80%{
    transform-origin: bottom left;
    transform: translateY(5px) rotate(20deg);
}
100%{
    transform-origin: bottom left;
    transform: translateY(5px) rotate(10deg);
}
`;

const LetterSlopeAni = styled.img`
width: calc((5vw + 5vh)/2);
height: calc((5vw + 5vh)/2);
animation: ${LetterSlope} 2s linear infinite;
`;