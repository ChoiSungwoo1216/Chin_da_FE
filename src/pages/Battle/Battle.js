import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

import ProgressBar from "./components/ProgressBar";
import Modal from 'react-modal';
// import CountDown from './components/CountDown';
// import Accordion from './components/Accordion';
// import ModalBox from "./components/ModalBox"
import AceEditorPlayer from "./components/AceEditorPlayer"
import AceEditorOpp from "./components/AceEditorOpp"
import ChatBox from "./components/ChatBox"
import Control from "./Control";
import { FailConfetti, SuccessConfetti } from './components/Confetti';
Modal.setAppElement('#root');

const Battle = () => {
    
   const [successModal, setSuccessModal] = React.useState();
   const [failModal, setFailModal] = React.useState();
   const [showModal, setShowModal] = React.useState(false);
   const [mode, setMode] = React.useState('java');
   const [theme, setTheme] = React.useState('monokai');
   const [startTemp, setStartTemp] = React.useState('');
   const [runTimer,setRunTimer] = React.useState('false');
   // console.log(runTimer+'--battle');

   function onRunTimer() {
      return setRunTimer(true);
   }

   //서버에서 받아오는 기본 형태들
//    const JsDefault = `function solution(num) { 
//    var answer = '';
//       return answer;
// }`;
//    const JavaDefault = `public String solution(int num) {
//    String answer = '';
//       return answer;
// }`
//    const PythonDefault = `def solution(num):
//    answer = ''
//    return answer`;
//    const DefaultTemp = "//함수와 변수를 임의로 변경하지 마세요" + `\n` + JavaDefault;
//    const DefaultTempTwo = "//함수와 변수를 임의로 변경하지 마세요" + `\n` + JavaDefault;

   //카메라 창 열고 닫기
   const [userCamSlide, setUserCamSlide] = React.useState(true)
   const [opCamSlide, setOpCamSlide] = React.useState(true)

   const openUserCam = () => {
      if (userCamSlide) {
         setUserCamSlide(false);
      } else {
         setUserCamSlide(true);
      }
   }
   const openOpCam = () => {
      if (opCamSlide) {
         setOpCamSlide(false);
      } else {
         setOpCamSlide(true);
      }
   }

   //채팅 열고 닫기
   const [chatOpen, setChatOpen] = React.useState(false);
   const openChat = () => {
      if (chatOpen) {
         setChatOpen(false);
      } else {
         setChatOpen(true);
      }
   }
   //문제 열고 닫기
   const [queOpen, setQueOpen] = React.useState(false);
   const openQue = () => {
      if (queOpen) {
         setQueOpen(false);
      } else {
         setQueOpen(true);
      }
   }

   const heightOpCode = () => {
      if (queOpen || chatOpen){
         if (queOpen && chatOpen){
            return ("18.6vh");
         }
         return ("51.24vh");
      }
      return ("100%")
   }

   const timerValue = {
      "Time": 300 ,
      "Active": runTimer
  }; 

   return (
      <Container>
         <HeadPart>
            <TimerDiv>
               <ProgressBar value={timerValue} />
            </TimerDiv>
            <BtnDiv>
               <button onClick={openQue}>문제</button>
               <button onClick={openChat}>채팅</button>
               <button>아이템</button>
            </BtnDiv>
         </HeadPart>
         <BodyPart>
            <UserDiv>
               <AceEditorPlayer mode={mode} theme={theme} />
               <UserCamDiv>
                  <CamBar>
                     <span>Player1</span>
                     <button onClick={openUserCam}>열고닫기</button>
                  </CamBar>
                  {userCamSlide && <Cam />}
               </UserCamDiv>
               <SubmitBtn>제&nbsp;&nbsp;&nbsp;&nbsp;출</SubmitBtn>
            </UserDiv>
            <OpponentDiv>
               {queOpen && (
                  <QueDiv>
                     <QueHead>
                        문제<button onClick={openQue}>x</button>
                     </QueHead>
                     <QueBox></QueBox>
                  </QueDiv>
               )}
               {chatOpen && (
                  <ChatingDiv>
                     <ChatHead>
                        Chatting <button onClick={openChat}>x</button>
                     </ChatHead>
                     <ChatBox
                     // id={channelId}
                     />
                  </ChatingDiv>
               )}
               <AceEditorOpp
                  mode={mode}
                  theme={theme}
                  heightOpCode={heightOpCode}
               />
               <OpCamDiv>
                  <CamBar>
                     <span>Player2</span>
                     <button onClick={openOpCam}>열고닫기</button>
                  </CamBar>
                  {opCamSlide && <Cam />}
               </OpCamDiv>
            </OpponentDiv>
         </BodyPart>
         {/* {showModal && <ModalBox/>} */}
         {successModal && <SuccessConfetti />} 
         {failModal && <FailConfetti />}
         <Control
            setRunTimer={setRunTimer}
            setShowModal={setShowModal}
            setSuccessModal={setSuccessModal}
            setFailModal={setFailModal}
         />
      </Container>
   );
}

export default Battle;

const Container = styled.div`
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%,-50%);
   display: flex;
   flex-direction: column;
   width: 94vw;
   height: 92vh;
`;

const HeadPart = styled.div`
   display: flex;
   flex-direction: row;
   width: 100%;
   height: 7vh;  
`;

const TimerDiv = styled.div`
   width: 54vw;
   height: 100%;
   margin-right:1.875vw;   
`;

const BtnDiv = styled.div`
   height: 100%;
   width: 45.125vw;
   background-color: yellow;
`;

const BodyPart = styled.div`
   display: flex;
   flex-direction: row;
   margin-top: 2vh;
   width: 100%;
   height: 100%;
`;

const UserDiv = styled.div`
   width: 54vw;
   height: 100%;
   margin-right:1.875vw;
   background-color: green;
`;

const UserCamDiv = styled.div`
   position: absolute;
   right:43.8vw;
   top: 8.2vh;
   height: 22.6vh;
   width: 14vw;
`;

const OpCamDiv = styled.div`
   position: absolute;
   right:calc(0vw - 3px);
   top: 8.2vh;
   height: 22.6vh;
   width: 14vw;
`;
const CamBar = styled.div`
   width: calc(100%-15px);
   height: 42.5px;
   line-height: 5vh;
   background-color: #ee82ee;
   color: black;
   opacity: 0.7;
   padding: 0 15px;
`;
const Cam = styled.div`
   width: 100%;
   height: calc(100% - 5vh);
   background-color: brown;
`;

const SubmitBtn = styled.button`
   width: 100%;
   height: 7vh;
   font-size: 30px;
   font-weight: 500;
   font-family: "PFstardust";
   background-color: #2D6BC8;
   color: white;
   z-index: 4;
`;

const OpponentDiv = styled.div`
   height: 100%;
   width: 45.125vw;
   background-color: purple;
`;

const ChatingDiv = styled.div`
   width: 100%;
   min-height: 30vh;
   background-color: red;
   margin-bottom: 2vh;
   border: 3px solid #2D6BC8;
`;
const ChatHead = styled.div`
   width: calc(100%-16px);
   height: 40px;
   font-size: 20px;
   line-height: 40px;
   padding-left:16px ;
   background-color: green;
`;
const QueDiv = styled.div`
   width: 100%;
   min-height: 30vh;
   background-color: red;
   margin-bottom: 2vh;
   border: 3px solid #2D6BC8;
`;
const QueHead = styled.div`
   width: calc(100%-16px);
   height: 40px;
   line-height: 40px;
   font-size: 20px;
   padding-left:16px ;
   background-color: green;
`;
const QueBox = styled.div`
   width: 100%;
   height: 25.7vh;
   overflow-y: auto;
   background-color: grey;
`;