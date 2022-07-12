import React from "react";
import styled, { css, keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateselected } from "../../../redux/modules/user";
// import axios from "axios";
// import { createchannel } from "../../../redux/modules/channel";

const Room = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { language, level, setLanOn, setLevOn, setRoomOn, es, hoverEs, enterEs } = props;
  //컴포넌트 이동
  const SelLang = () => {
    setRoomOn(false);
    setLanOn(true);
    es.play();
  };
  const SelLev = () => {
    setRoomOn(false);
    setLevOn(true);
    es.play();
  };
  //방만들기 요청
  // const createChannelAxios = async () => {
  //    await axios(
  //      {
  //        url: "/room",
  //        method: "post",
  //        baseURL: "http://54.180.154.178",
  //      })
  //      .then((res) => {
  //        console.log(JSON.stringify(res.data));
  //        dispatch(createchannel({id : res.data.channelid}))
  //      })
  //      .catch((error) => {
  //        console.log(error);
  //      });
  //  }

  const CreateRoom = () => {
    navigate("/Battle");
    dispatch(updateselected({ language: language, level: level }));
    // dispatch(createChannelAxios())
    enterEs.play();
  };

  const EnterRoom = () => {
    navigate("/Main");
    dispatch(updateselected({ language: language, level: level }));
    enterEs.play();
  };

  const HoverEs = () =>{
    hoverEs.play();
  }

  return (
    <>
      <Title>방 선택</Title>
      <Wrapper>
        <SelectedDiv onClick={SelLang}>
          <TypeBtn language={language} />
        </SelectedDiv>
        <SelectedDiv onClick={SelLev}>
          <InsideBtn1 level={level} />
        </SelectedDiv>
        <RoomSelectDiv>
            <InsideBtn2 onClick={CreateRoom} onMouseOver={()=>{HoverEs()}}>방 만들기</InsideBtn2>
            <InsideBtn3 onClick={EnterRoom} onMouseOver={()=>{HoverEs()}}>방 선택하기</InsideBtn3>
        </RoomSelectDiv>
      </Wrapper>
    </>
  );
};
const Title = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 7vh;
  position: absolute;
  z-index: 1;
  color: #fff;
  font-size: calc((7vh+7vw));
`;

const Wrapper = styled.div`
  width: 90%;
  display: flex;
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
  width: 22.03vw;
  height: 48.6vh;
  margin: auto 20px;
  padding: 1.5em;
  background-image: url(/img/selectBox.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  &:hover{
    transition: 0.5s;
    opacity: 0.75;
  }
`;

const TypeBtn = styled.div`
  display: flex;
  flex-direction: column;
  ${(props) => {
    if (props.language === "0") {
      return css`
        background-image: url("/img/python3.svg");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      `;
    } else if (props.language === "1") {
      return css`
        background-image: url("/img/java.svg");
        background-position: cover;
        background-repeat: no-repeat;
        background-position: center;
        transform: scale(1.3);
        `;
    } else if (props.language === "2") {
      return css`
        background-image: url("/img/js.svg");
        background-position: cover;
        background-repeat: no-repeat;
        background-position: center;
        `;
    }
  }}
  width: 80%;
  height: 80%;
  overflow: hidden;
  object-fit: cover;
`;

const RoomSelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 22.03vw;
  height: 48.6vh;
  margin: 20px;
  padding: 1.5em;
  background-image: url(/img/selectBox.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const InsideBtn1 = styled.div`
  ${(props) => {
    if (props.level === "0") {
      return css`
        background-image: url("/img/starOne.svg");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      `;
    } else if (props.level === "1") {
      return css`
        background-image: url("/img/starTwo.svg");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        `;
    } else if (props.level === "2") {
      return css`

        background-image: url("/img/starThree.svg");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        `;
    }
  }}
  width: 70%;
  height: 70%;
  margin-top: 0;
`;

const shackBtn = keyframes`
0%{
  transform: rotate(0deg);
}
10%{
  transform: rotate(3deg);
}
20%{
  transform: rotate(0deg);
}
30%{
  transform: rotate(-3deg);
}
40% {
  transform: rotate(0deg);
}
100%{
  transform: rotate(0deg);
}
`;

const InsideBtn2 = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin: 0;
width: 81.3%;
height: 35%;
color: white;
font-size: calc((1vh + 1vw));
background-image: url(/img/selectRoomBtn.svg);
background-repeat: no-repeat;
background-size: contain;
background-position: center;  
animation: ${shackBtn} 2s linear infinite;
-webkit-animation: ${shackBtn} 2s linear infinite;
opacity: 0.85;
&:hover{
  opacity: 1;
  transform: scale(1.1);
  animation: none;
}
`;

const InsideBtn3 = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin: 0;
width: 81.3%;
height: 35%;
color: white;
font-size: calc((1vh + 1vw));
background-image: url(/img/selectRoomBtn.svg);
background-repeat: no-repeat;
background-size: contain;
background-position: center;  
animation: ${shackBtn} 2s linear infinite;
-webkit-animation: ${shackBtn} 2s linear infinite;
opacity: 0.85;
&:hover{
  opacity: 1;
  transform: scale(1.1);
  animation: none
}
`;
export default Room;
