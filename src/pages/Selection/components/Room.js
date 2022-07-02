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
          <Title>방 선택</Title>
          <Wrapper>
             <SelectedDiv onClick={SelLang}>
                <InsideBtn1>{languageIs(language)}</InsideBtn1>
             </SelectedDiv>
             <SelectedDiv onClick={SelLev}>
                <InsideBtn1>{levelIs(level)}</InsideBtn1>
             </SelectedDiv>
             <RoomSelectDiv>
                <RoomSelect onClick={CreateRoom}>
                   <InsideBtn2>방 만들기</InsideBtn2>
                </RoomSelect>
                <RoomSelect onClick={EnterRoom}>
                   <InsideBtn2>방 들어가기</InsideBtn2>
                </RoomSelect>
             </RoomSelectDiv>
          </Wrapper>
       </>
    );
}
const Title = styled.div`
   width: 100%;
   text-align: center;
   margin-top: 50px;
   position: absolute;
   z-index: 1;
   color: #fff;
   font-size: 40px;
`;

const Wrapper = styled.div`
   width: 90%;
   display: flexbox;
   justify-content: center;
   align-items: center;
   min-height: 100vh;
   margin: auto;
   position: relative;
`;

const SelectedDiv = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 250px;
   height: 350px;
   background-color: #ffffff1a;
   margin: 20px;
   padding: 1.5em;
   border-radius: 25px;
   border: 1px solid #0000001a;
   text-align: center;
`;

const LevelBtn = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 250px;
   height: 350px;
   background-color: #ffffff1a;
   margin: 20px;
   padding: 1.5em;
   border-radius: 25px;
   border: 1px solid #0000001a;
   text-align: center;
`;

const RoomSelectDiv = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 250px;
   height: 350px;
   background-color: #ffffff1a;
   margin: 20px;
   padding: 1.5em;
   border-radius: 25px;
   border: 1px solid #0000001a;
   text-align: center;
`;

const RoomSelect = styled.button`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 230px;
   height: 80px;
   background-color: #ffffff1a;
   margin: 10px;
   border-radius: 10px;
   border: 1px solid #0000001a;
   text-align: center;
`;

const InsideBtn1 = styled.div`
   color: #fff;
   text-transform: uppercase;
   font-size: 30px;
`;
const InsideBtn2 = styled.div`
   color: #fff;
   font-size: 30px;
`;
// animation: motion 0.3s linear 0s infinite alternate; margin-top: 0;
//	-webkit-animation: motion 0.3s linear 0s infinite alternate; margin-top: 0;

export default Room;