import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"

const Room = (props) => {
    const navigate = useNavigate();
    const {
        language,
        level,
        setLanOn,
        setLevOn,
        setRoomOn,
    } = props

    const SelLang = () => {
        setRoomOn(false);
        setLanOn(true);
    }
    const SelLev = () => {
        setRoomOn(false);
        setLevOn(true);
    }

    const CreateRoom = () => {
        // axios post, language, level 같이 보내고, 채널id response로 받아오기
        navigate("/Battle");
    }

    const EnterRoom = () => {
        // axios get params로 language, level 같이 보내고 response로 채널 리스트 받기
        navigate("/Main");
    }

    const languageIs = (language) => {
        if (language === "0") {
            return ("PYTHON");
        } else if (language === "1") {
            return ("JAVA");
        } else {
            return ("JAVASCRIPT")
        }
    }

    const levelIs = (level) => {
        if (level === "0") {
            return ("⭐");
        } else if (level === "1") {
            return ("⭐⭐");
        } else {
            return ("⭐⭐⭐")
        }
    }

    return (
        <>
            <Title>
                방 선택
            </Title>
            <Div>
                <SelectedDiv onClick={SelLang}>
                    <InsideBtn>
                        {languageIs(language)}
                    </InsideBtn>
                </SelectedDiv>
                <SelectedDiv onClick={SelLev}>
                    <InsideBtn>
                        {levelIs(level)}
                    </InsideBtn>
                </SelectedDiv>
                <RoomSelectDiv>
                    <RoomSelect onClick={CreateRoom}>
                        <InsideBtn>
                            방 만들기
                        </InsideBtn>
                    </RoomSelect>
                    <RoomSelect onClick={EnterRoom}>
                        <InsideBtn>
                            방 들어가기
                        </InsideBtn>
                    </RoomSelect>
                </RoomSelectDiv>
            </Div>
        </>
    )
}
const Title = styled.div`
width: 100%;
height: 128px;
text-align: center;
line-height: 128px;
font-size: 40px;
`;

const Div = styled.div`
width: 90%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-evenly;
padding : 5%;
`;

const SelectedDiv = styled.div`
width: 25vw;
height: 60vh;
font-size: 50px;
word-wrap: break-word;
line-height: 60vh;
text-align: center;
background-color: #808080;
`;

const RoomSelectDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-evenly;
width: 25vw;
height: 60vh;
font-size: 50px;
word-wrap: break-word;
background-color: #e0e0e0;
`;

const RoomSelect = styled.button`
width: 80%;
height: 20%;
font-size: 40px;
`;

const InsideBtn = styled.div`
animation: motion 0.3s linear 0s infinite alternate; margin-top: 0;
	-webkit-animation: motion 0.3s linear 0s infinite alternate; margin-top: 0;
`;

export default Room