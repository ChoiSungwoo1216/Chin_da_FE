import React from "react";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/ext-language_tools';

import Modal from 'react-modal';
import CountDown from './components/CountDown';
import Accordion from './components/Accordion';

Modal.setAppElement('#root');

const Battle = () => {
   const [showModal, setShowModal] = React.useState(true);
   const [mode, setMode] = React.useState('java');
   const [theme, setTheme] = React.useState('monokai');
   const [startTemp, setStartTemp] = React.useState('')

   function onChangeOne(newValue) {
      console.log('1:', newValue);
   }
   function onChangeTwo(newValue) {
      console.log('2:', newValue);
   }

   //서버에서 받아오는 기본 형태들
   const JsDefault = `function solution(num) { 
   var answer = '';
      return answer;
}`;

   const JavaDefault = `public String solution(int num) {
   String answer = '';
      return answer;
}`

   const PythonDefault = `def solution(num):
   answer = ''
   return answer`;

   const DefaultTemp = "//함수와 변수를 임의로 변경하지 마세요" + `\n` + JavaDefault;
   const DefaultTempTwo = "//함수와 변수를 임의로 변경하지 마세요" + `\n` + JavaDefault;

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
   return (
      <Container>
         <HeadPart>
            <TimerDiv></TimerDiv>
            <BtnDiv>
               <button onClick={openQue}>문제</button>
               <button onClick={openChat}>채팅</button>
               <button>아이템</button>
            </BtnDiv>
         </HeadPart>
         <BodyPart>
            <UserDiv>
               <AceEditor
                  height="76.88vh"
                  width="100%"
                  mode={mode}
                  theme={theme}
                  onChange={onChangeOne}
                  fontSize={15}
                  showPrintMargin={false}
                  editorProps={{ $blockScrolling: true }}
                  highlightActiveLine={true}
                  cursorStart={2}
                  setOptions={{
                     enableBasicAutocompletion: true,
                     enableLiveAutocompletion: true,
                     enableSnippets: true,
                     tabSize: 4,
                  }}
                  value={DefaultTemp}
                  placeholder="Placeholder Text"
               />
               <UserCamDiv>
                  <CamBar><span>Player1</span><button onClick={openUserCam}>열고닫기</button></CamBar>
                  {userCamSlide && (<Cam />)}
               </UserCamDiv>
               <SubmitBtn>제&nbsp;&nbsp;&nbsp;&nbsp;출</SubmitBtn>
            </UserDiv>
            <OpponentDiv>
               {queOpen &&
                  <QueDiv>
                     <QueHead>문제<button onClick={openQue}>x</button></QueHead>
                     <QueBox></QueBox>
                  </QueDiv>
               }
               {chatOpen &&
                  <ChatingDiv>
                     <ChatHead>Chatting <button onClick={openChat}>x</button></ChatHead>
                     <ChatBox></ChatBox>
                     <ChatInputDiv>
                        <ChatInput />
                        <ChatSend>Send</ChatSend>
                     </ChatInputDiv>
                  </ChatingDiv>
               }
               <AceEditor
                  width="100%"
                  height={heightOpCode()}
                  mode={mode}
                  theme={theme}
                  fontSize={15}
                  onChange={onChangeTwo}
                  editorProps={{ $blockScrolling: true }}
                  showPrintMargin={false}
                  readOnly={true}
                  highlightActiveLine={true}
                  setOptions={{
                     enableBasicAutocompletion: true,
                     enableLiveAutocompletion: true,
                     enableSnippets: true,
                  }}
                  value={DefaultTempTwo}
                  placeholder="Placeholder Text"
               />
               <OpCamDiv>
                  <CamBar><span>Player2</span><button onClick={openOpCam}>열고닫기</button></CamBar>
                  {opCamSlide && (<Cam />)}
               </OpCamDiv>
            </OpponentDiv>
         </BodyPart>
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
   /* background-color: white; */
   /* border: 5px solid white; */
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
   background-color: blue;
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
const ChatBox = styled.div`
   width: 100%;
   height: 18vh;
   overflow-y: hidden;
   background-color: grey;
`;
const ChatInputDiv = styled.div`
   display: flex;
   align-items: center;
   width: 100%;
   height: 7vh;
`;
const ChatInput = styled.input`
width: 80%;
height: 5vh;
font-size: 16px;
margin-right: 25px;
margin-left: 11px;
`;

const ChatSend = styled.button`
   width: 4.6vw;
   height: 3.5vh;
   background-color: #2D6BC8;
`
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
// const Section = styled.section`
//    display: flex;
//    justify-content: center;
//    margin: auto;
// `;

// const Aside = styled.aside`
//    margin: auto;
//    width: 300px;
//    height: 500px;
//    border: 1px solid;
// `;

// const Input = styled.input`
//    align-items: center;
//    justify-content: center;
// `;

// const ModalBtn = styled.button`
//    position: absolute;
//    width: 30px;
//    height: 30px;
//    left: 919px;
//    top: 135px;
// `;


{/* <Container>
{showModal ? (
   <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      style={{
         width: '70%',
      }}
   >
      <ModalBtn
         src="/img/X_btn_white_50.png"
         onClick={() => setShowModal(false)}
      >
         Close
      </ModalBtn>
   </Modal>
) : (
   <>
      <Section>
         <div>
            <AceEditor
               style={{
                  width: 700,
                  margin: 5,
               }}
               mode={modeOne}
               theme={themeOne}
               onChange={onChangeOne}
               fontSize={15}
               name="UNIQUE_ID_OF_DIV"
               editorProps={{ $blockScrolling: true }}
               highlightActiveLine={true}
               setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  tabSize: 4,
               }}
               value={valueType(modeOne)}
               placeholder="Placeholder Text"
            />
         </div>
         <div>
            <AceEditor
               style={{
                  width: 700,
                  height: 300,
                  margin: 5,
               }}
               mode={modeTwo}
               theme="github"
               onChange={onChangeTwo}
               name="UNIQUE_ID_OF_DIV"
               editorProps={{ $blockScrolling: true }}
               highlightActiveLine={true}
               setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
               }}
               value={valueType(modeTwo)}
               placeholder="Placeholder Text"
            />
         </div>
      </Section>
      <Accordion />
      <Aside>
         <Input />
      </Aside>
   </>
)}
</Container> */}