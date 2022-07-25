import React, { useState, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import Peer from "peerjs";
import Modal from "react-modal";

/*COMPONENTS*/
import Control from "./Control";
import { AceEditorPlayer, AceEditorOpp } from "./components/AceEditors";
import {
   QuestionModal,
   SuccessModal,
   FailModal,
   Result,
   GameRuleModal,
} from "./components/Modals";
import {
   ReadyUser,
   ReadyOpp,
   UserSubmitPending,
   OppSubmitPending,
} from "./components/ReadyAndPending";
import ChatBox from "./components/ChatBox";
import ProBar from "./components/ProBar";
import Alert from "./components/Alert";
import Countdown from "./components/CountDown";

/*AUDIO*/
import useSound from "../../shared/useSound";
import effectSound from "../../shared/effectSound";
import btnSound from "../../audios/btnselect.mp3";
// import camSound from "../../audios/camOff.mp3";
import battleBgm from "../../audios/battle_bgm.mp3";
import newOp from "../../audios/newOpponent.mp3";
import failSound from "../../audios/FailSE4.mp3";
import noItem from "../../audios/noItemSE1.mp3";
import newMes from "../../audios/newMessage.mp3";

//websocket
import * as StompJS from "stompjs";
import * as SockJS from "sockjs-client";
import { addchatlist, deletechatlist } from "../../redux/modules/chatlist";

import {
   alreadyUser,
   gameSwitch,
   setLevel,
   setMsg,
   setAlert,
   setPending,
   ModalOpen,
} from "../../redux/modules/battleFunction";
import HeaderBtn from "./components/HeaderBtn";

Modal.setAppElement("#root");

const Battle = (props) => {
   const api = process.env.REACT_APP_API;
   const Authorization = sessionStorage.getItem("Authorization");

   const selected = useSelector((state) => state.user.selected);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();
   const params = useParams();

   //Bgm
   const { setMbmute } = props;
   const volume = useSelector((state) => state.user.sound);
   const [bbmute, setBbmute] = useState(true);
   useSound(battleBgm, volume.bgm, bbmute);

   //Sound
   const userSound = useSelector((state) => state.user.sound);
   const btnEs = effectSound(btnSound, userSound.es);
   const newOpEs = effectSound(newOp, userSound.es);
   const failEs = effectSound(failSound, userSound.es);
   const noItemEs = effectSound(noItem, userSound.es);
   const newMesEs = effectSound(newMes, userSound.es);
   // const camEs = effectSound(camSound, userSound.es);

   //RoomInfo
   const info = location.state;
   const roomId = params.id;
   const questionId = location.state.questionId;
   const server = location.state.server;
   // console.log(info);

   //Timer,ProgressBar
   dispatch(setLevel(selected.level));

   //GameStart
   const gameStart = useSelector((state) => state.battleFunction.gameStatus);

   //Toastify Alert
   const resAlert = (r) => {
      dispatch(setMsg(r));
      dispatch(setAlert(true));
   };

   //game server
   const username = sessionStorage.getItem("username");
   const headers = { Authorization: Authorization };
   let sock = new SockJS(`${api}/ws-stomp?username=` + encodeURI(username));
   let client = StompJS.over(sock);
   const opCode = useRef();
   const [questionTitle, setQuestionTitle] = useState("");
   const [question, setQuestion] = useState("");
   const [template, setTemplate] = useState("");
   const codeRef = useRef("");
   
   React.useEffect(() => {
      if (roomId !== undefined) {
         connect();
         Chatconnect();
         return () => {
            if (gameStart === true) {
               exitLose();
               exitMes();
               setTimeout(() => { client.disconnect() }, 500)
            } else {
               exitMes();
               setTimeout(() => { client.disconnect() }, 500)
            }
            dispatch(deletechatlist());
            EnterSend();
            setTimeout(()=>{clientChat.disconnect()}, 500)
         };
      }
   }, [roomId]);

   //서버 연결
   const connect = () => {
      client.connect(headers, onConnected, onError);
      client.heartbeat.outgoing = 20000;
      client.heartbeat.ingoing = 0;
   };
   // 서버 연결 성공 시 콜백함수
   const onConnected = () => {
      client.subscribe(`/topic/game/room/${roomId}`, ReceiveCallBack); //입장자 정보 전송 구독, ready 구독 주소
      client.subscribe(`/user/queue/game/codeMessage/${roomId}`, ReceiveCallBack); //실시간 코드 전송 구독 주소
   };
   const ReceiveCallBack = (message) => {
      if (message.body) {
         const mes = JSON.parse(message.body);
         // console.log(mes);
         switch (mes.type) {
            case "READY":
               setQuestion(mes.question);
               setQuestionTitle(mes.title);
               setTemplate(mes.template)
               dispatch(alreadyUser({ opp: true }));
               break;
            case "USERINFO":
               if (mes.sender !== username) {
                  newOpEs.play();
                  resAlert("상대 입장");
               }
               break;
            case "GAME":
               opCode.current = mes.message;
               console.log(mes.message + "----");
               break;
            case "LOSE":
               setShowFailModal(true);
               break;
            case "FAIL":
               resAlert(mes.message);
               noItemEs.play();
               break;
            case "WIN":
               setShowSuccessModal(true);
               break;
            case "EXIT":
               resAlert(mes.message)
               newMesEs.play();
               break;
            default:
         }
      } else {
         alert("error");
      }
   };

   // 서버 연결 실패시
   const onError = (err) => {
      console.log(err);
   };

   //준비 전송
   const sendReady = () => {
      client.send(
         `/app/game/ready`,
         {},
         JSON.stringify({
            roomId: roomId,
            server: server,
         })
      );
   };

   //실시간 코드 전송
   const sendT = useSelector((state) => state.battleFunction.sendRun);

   const sendCode = async () => {
      await client.send(
         `/app/game/codeMessage`,
         {},
         JSON.stringify({
            roomId: roomId,
            sender: username,
            message: codeRef.current,
         })
      );
   };

   useEffect(() => {
      if (gameStart === true) {
         setTimeout(() => sendCode(), 500);
      }
   }, [sendT]);

   //컴파일 3회 실패 시
   const compileFailedLose = () => {
      client.send(
         `/app/game/process`,
         {},
         JSON.stringify({
            type: "COMPILE_FAIL_LOSE",
            username: username,
            roomId: roomId,
         })
      );
   };

   //타임아웃 패배
   const timeOutLose = () => {
      client.send(
         `/app/game/process`,
         {},
         JSON.stringify({
            type: "TIMEOUT",
            username: username,
            roomId: roomId,
         })
      );
   };

   //탈주 패
   const exitLose = () => {
      client.send(
         `/app/game/process`,
         {},
         JSON.stringify({
            type: "EXIT_LOSE",
            username: username,
            roomId: roomId,
         })
      );
   };

   //퇴장
   const exitMes = () => {
      client.send(
         `/app/game/process`,
         {},
         JSON.stringify({
            type: "EXIT",
            username: username,
            roomId: roomId,
         })
      );
   };

   //채팅 서버
   const ChatApi = process.env.REACT_APP_API_CHAT;

   let socket = new SockJS(`${ChatApi}/ws-stomp?name=` + encodeURI(username));
   let clientChat = StompJS.over(socket);

   const Chatconnect = () => {
      clientChat.connect({}, onConnect, onError);
      clientChat.heartbeat.outgoing = 20000;
      clientChat.heartbeat.ingoing = 0;
   };

   const onConnect = () => {
      clientChat.subscribe(`/sub/chat/room/${roomId}`, ReceiveFunc);
      EnterSend();
   };

   const EnterSend = () => {
      clientChat.send(
         `/pub/chat/message`,
         {},
         JSON.stringify({
            type: "ENTER",
            roomId: roomId,
            sender: username,
         })
      );
   };

   const ExitSend = () => {
      clientChat.send(
         `/pub/chat/message`,
         {},
         JSON.stringify({
            type: "EXIT",
            roomId: roomId,
            sender: username,
         })
      );
   };

   const ReceiveFunc = (message) => {
      if (message.body) {
         newMesEs.play();
         const mes = JSON.parse(message.body);
         console.log(mes);
         switch (mes.type) {
            case "ENTER":
               dispatch(
                  addchatlist({
                     type: mes.type,
                     message: mes.message,
                     sender: mes.sender,
                  })
               );
               break;
            case "TALK":
               dispatch(
                  addchatlist({
                     type: mes.type,
                     message: mes.message,
                     sender: mes.sender,
                  })
               );
               break;
            case "EXIT":
               dispatch(
                  addchatlist({
                     type: mes.type,
                     message: mes.message,
                     sender: mes.sender,
                  })
               );
               break;
            default:
         }
      } else {
         alert("error");
      }
   };

   //방나가기 요청
   const leaveRoomAxios = async () => {
      await axios({
         url: "/game/room/exit",
         method: "PUT",
         baseURL: api,
         data: {
            roomId: roomId,
            server: server,
         },
         headers: {
            Authorization: Authorization,
         },
      })
         .then((response) => {
            setBbmute(true);
            setMbmute(false);
            btnEs.play();
            navigate(`/Main`);
         })
         .catch((error) => {
            console.log(error)
            if (error.response.data === "참여자가 아닙니다"){
               navigate("/selection");
            }
            if (error.response.data.reLogin === true) {
               sessionStorage.clear();
               localStorage.clear();
               window.location.replace("/");
            }
         });
   };

   //Modals
   const [showQuestionModal, setShowQuestionModal] = useState();
   const [showSuccessModal, setShowSuccessModal] = useState();
   const [showFailModal, setShowFailModal] = useState();

   //AceEditor
   const langType = ["java", "javascript", "python"];
   const mode = langType[parseInt(selected.language)];

   //CountDown
   // const [runCountdown, setRunCountdown] = useState(false);

   //Submit
   const [trySub, setTrySub] = useState(3);
   const axiosSubmit = () => {
      axios({
         url: "/api/compile",
         method: "POST",
         baseURL: api,
         data: {
            roomId: roomId,
            questionId: questionId,
            languageIdx: parseInt(selected.language),
            codeStr: codeRef.current,
         },
         headers: {
            Authorization: Authorization,
         },
      })
         .then((res) => {
            console.log(res);
            if (res.data.result === true) {
               setShowSuccessModal(true);
            } else {
               setTrySub(trySub - 1);
               if (trySub === 1) {
                  compileFailedLose();
                  setShowFailModal(true);
               } else {
                  resAlert(res.data.msg);
                  failEs.play();
               }
            }
         })
         .catch((err) => {
            console.log(err);
            resAlert("Fail to connect to server!");
            failEs.play();
         });
   };

   const onSubmit = () => {
      dispatch(setPending({ user: true }));
      setTimeout(() => axiosSubmit(), 1000);
   };

   //카메라창 열고 닫기
   // const [userCamSlide, setUserCamSlide] = useState(true);
   // const [opCamSlide, setOpCamSlide] = useState(true);

   // const openUserCam = () => {
   //   camEs.play();
   //   if (userCamSlide) {
   //     setUserCamSlide(false);
   //   } else {
   //     setUserCamSlide(true);
   //     call(remotePeerIdValue);
   //   }
   // };
   // const openOpCam = () => {
   //   camEs.play();
   //   if (opCamSlide) {
   //     setOpCamSlide(false);
   //   } else {
   //     setOpCamSlide(true);
   //     call(remotePeerIdValue);
   //   }
   // };

   // header Modal
   const modal = useSelector((state) => state.battleFunction.modalOpen);

   //결과창 열기
   const [rOpen, setROpen] = useState(false);
   const [result, setResult] = useState("WIN");

   //나가기
   const BackToMain = () => {
      leaveRoomAxios();
      dispatch(gameSwitch(false));
   };

   //Peer
   // const [peerId, setPeerId] = useState("");
   // const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
   // const remoteVideoRef = useRef(null);
   // const peerInstance = useRef(null);
   // const currentUserVideoRef = useRef(null);

   // useEffect(() => {
   //   const peer = new Peer();
   //   //제일 처음 peer가 만들어지면서 랜덤한 id가 만들어짐
   //   peer.on("open", (id) => {
   //     setPeerId(id);
   //   });

   //   peer.on("call", (call) => {
   //     var getUserMedia =
   //       navigator.getUserMedia ||
   //       navigator.webkitGetUserMedia ||
   //       navigator.mozGetUserMedia;

   //     getUserMedia({ /*audio: true,*/ video: true }, (mediaStream) => {
   //       currentUserVideoRef.current.srcObject = mediaStream;
   //       currentUserVideoRef.current.play();
   //       call.answer(mediaStream);
   //       call.on("stream", (remoteStream) => {
   //         remoteVideoRef.current.srcObject = remoteStream;
   //         remoteVideoRef.current.play();
   //       });
   //     });
   //   });

   //   peerInstance.current = peer;
   //   //외부로 peer 선언해주려고
   // }, []);

   // const call = (remotePeerId) => {
   //   var getUserMedia =
   //     navigator.getUserMedia ||
   //     navigator.webkitGetUserMedia ||
   //     navigator.mozGetUserMedia;

   //   getUserMedia({ /*audio: true,*/ video: true }, (mediaStream) => {
   //     //현재 내 화면
   //     currentUserVideoRef.current.srcObject = mediaStream;
   //     currentUserVideoRef.current.play();

   //     const call = peerInstance.current.call(remotePeerId, mediaStream);

   //     call.on("stream", (remoteStream) => {
   //       // Show stream in some video/canvas element.
   //       // 상대방 영상 받아오는 부분
   //       // 두개 같이 써줘야 작동함
   //       remoteVideoRef.current.srcObject = remoteStream;
   //       remoteVideoRef.current.play();
   //     });
   //   });
   // };

   // console.log(peerId);

   return (
      <Container>
         <Countdown />
         <Alert />
         <HeadPart>
            <TimerDiv>
               <ProBar timeOutLose={timeOutLose} />
            </TimerDiv>
            <BtnDiv>
               <HeaderBtn
                  BackToMain={BackToMain}
                  dispatch={dispatch}
                  ModalOpen={ModalOpen}
               />
               {/* <BtnOnOff onClick={openQue} change={queOpen}>
                  문제
               </BtnOnOff>
               <BtnOnOff onClick={openChat} change={chatOpen}>
                  채팅
               </BtnOnOff>
               <BtnOnOff onClick={() => setGameRuleModal(true)}>규칙</BtnOnOff>
               <ExitBtn onClick={BackToMain}>나가기</ExitBtn> */}
            </BtnDiv>
         </HeadPart>
         <BodyPart>
            <UserDiv>
               {gameStart === false ? <ReadyUser sendReady={sendReady} /> : null}
               <UserSubmitPending />
               <AceEditorPlayer mode={mode} codeRef={codeRef}></AceEditorPlayer>
               {/* <UserCamDiv>
            <CamBar>
              <span>Player1</span>
              <CamIcon
                src={
                  userCamSlide === true
                    ? "/img/cam_icon.svg"
                    : "/img/cam_double_cross.svg"
                }
                alt=""
                onClick={openUserCam}
              />
            </CamBar>
            {userCamSlide && (
              <Cam>
                <video
                  style={{
                    width: "auto",
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                  ref={currentUserVideoRef}
                />
              </Cam>
            )}
          </UserCamDiv> */}
               <SubmitBtn onClick={() => onSubmit()}>
                  제&nbsp;&nbsp;&nbsp;&nbsp;출&nbsp;&nbsp;{trySub}&nbsp;/&nbsp;3
               </SubmitBtn>
            </UserDiv>
            <OpponentDiv>
               {modal.que === true && (
                  <QueDiv queOpen={modal.que} chatOpen={modal.chat}>
                     <QueHead>
                        <p>Question</p>
                     </QueHead>
                     <QueBox>
                        <p>{questionTitle}</p>
                        <div>{question}</div>
                     </QueBox>
                  </QueDiv>
               )}
               {modal.chat && (
                  <ChatingDiv>
                     <ChatHead>
                        <p>Chatting</p>
                     </ChatHead>
                     <ChatBox roomId={roomId} username={username} />
                  </ChatingDiv>
               )}
               <CodeDiv queOpen={modal.que} chatOpen={modal.chat}>
                  {gameStart === false ? <ReadyOpp /> : null}
                  <OppSubmitPending />
                  <AceEditorOpp mode={mode} opCode={opCode} />
               </CodeDiv>
               {/* <OpCamDiv>
            <CamBar>
              <span>Player2</span>
              <CamIcon
                src={
                  opCamSlide === true
                    ? "/img/cam_icon.svg"
                    : "/img/cam_double_cross.svg"
                }
                alt=""
                onClick={openOpCam}
              />
            </CamBar>
            {opCamSlide && (
              <Cam>
                <video
                  style={{
                    width: "auto",
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                  ref={remoteVideoRef}
                />
              </Cam>
            )}
          </OpCamDiv> */}
            </OpponentDiv>
         </BodyPart>
         {showQuestionModal && (
            <QuestionModal
               setValue={setShowQuestionModal}
               questionTitle={questionTitle}
               question={question}
            />
         )}
         {showSuccessModal && (
            <SuccessModal
               setROpen={setROpen}
               setResult={setResult}
               setBbmute={setBbmute}
            // setRunTimer={setRunTimer}
            />
         )}
         {showFailModal && (
            <FailModal
               setROpen={setROpen}
               setResult={setResult}
               setBbmute={setBbmute}
            // setRunTimer={setRunTimer}
            />
         )}
         {modal.rule === true && (
            <GameRuleModal ModalOpen={ModalOpen} modal={modal} />
         )}
         {rOpen && (
            <Result
               setROpen={setROpen}
               result={result}
               setMbmute={setMbmute}
               setTrySub={setTrySub}
            />
         )}

         <Control
            setShowQuestionModal={setShowQuestionModal}
            setShowSuccessModal={setShowSuccessModal}
            setShowFailModal={setShowFailModal}
            setROpen={setROpen}
            // remotePeerIdValue={remotePeerIdValue}
            // setRemotePeerIdValue={setRemotePeerIdValue}
            // call={call}
            // peerId={peerId}
            // setRunCountdown={setRunCountdown}
            setMbmute={setMbmute}
            setBbmute={setBbmute}
            sendReady={sendReady}
         />
      </Container>
   );
};

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  margin-right: 1.875vw;
`;

const BtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 100%;
  width: 45.125vw;
`;

const BattleBtnAni = keyframes`
0% {
  transform: translateY(0);
}
25%{
  transform: translateY(-5px);
}
50%{
  transform: translateY(0);
}
75%{
  transform: translateY(5px);
}
100% {
  transform: translateY(0px);
}
`;

const BtnOnOff = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc((3vh + 3vw) / 4);
  color: white;
  width: 13.5%;
  height: 100%;
  ${(props) => {
      if (props.change) {
         return css`
        background-image: url(/img/questionBtnBlack.svg);
        border: 2px inset #c1b78e;
        border-radius: 10px;
      `;
      }
      return css`
      background-image: url(/img/questionBtnBlue.svg);
      border: 2px inset #5777ce;
      border-radius: 10px;
    `;
   }}
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  animation: ${BattleBtnAni} 3s 0.5s linear infinite;
`;

const ExitBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc((3vh + 3vw) / 4);
  color: white;
  width: 30%;
  height: 100%;
  background-image: url(/img/ExitBattleBtn.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  animation: ${BattleBtnAni} 3s linear infinite;
  border: 2px inset #5777ce;
  border-radius: 10px;
`;

const BodyPart = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2vh;
  width: 100%;
  height: 100%;
`;

const UserDiv = styled.div`
  width: 56.5%;
  height: 100%;
  margin-right: 1.875vw;
  border-radius: 5px;
  border-top: 7px solid #fffae3;
  border-left: 7px solid #fffae3;
  border-right: 7px solid #c1b78e;
  border-bottom: 7px solid #a0935c;
`;

// const UserCamDiv = styled.div`
//   position: absolute;
//   left: 40%;
//   top: 9.1vh;
//   height: 22.6vh;
//   width: 14vw;
// `;

// const OpCamDiv = styled.div`
//   position: absolute;
//   right: -2.3%;
//   top: 8.9vh;
//   height: 22.6vh;
//   width: 14vw;
// `;
// const CamBar = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   gap: 30%;
//   width: 85%;
//   height: 20%;
//   background-color: #5777ce;
//   color: white;
//   font-size: calc((2vh + 2vw) / 2);
//   opacity: 0.8;
//   border: 3px solid black;
// `;

// const CamIcon = styled.img`
//   width: calc((2vh + 2vw) / 2);
//   height: calc((2vh + 2vw) / 2);
//   &:hover {
//     content: url("/img/cam_cross.svg");
//   }
// `;

// const Cam = styled.div`
//   display: flex;
//   width: 11.9vw;
//   height: 11.9vw;
//   background-color: white;
//   border-left: 3px solid black;
//   border-right: 3px solid black;
//   border-bottom: 3px solid black;
// `;

const SubmitBtn = styled.button`
  width: 100%;
  height: 7%;
  font-size: calc((5vh + 5vw) / 4);
  font-weight: 500;
  font-family: "Neo";
  background-color: #5777ce;
  opacity: 1;
  color: white;
  z-index: 4;
  border-top: 3px solid #c0cfff;
  border-left: 3px solid #c0cfff;
  border-right: 5px solid #a2b7ed;
  border-bottom: 4px solid #a2b7ed;
`;

const OpponentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 102.1%;
  width: 45.125vw;
  margin: 0;
  padding: 0;
`;

const ChatingDiv = styled.div`
  width: 100%;
  height: 36%;
`;
const ChatHead = styled.div`
  display: flex;
  align-items: center;
  width: 100.4%;
  height: 4vh;
  background-color: #5777ce;
  border-top: 4px solid #c0cfff;
  border-left: 4px solid #c0cfff;
  border-right: 4px solid #c0cfff;
  border-bottom: 4px solid black;
  border-radius: 5px;
  p {
    padding-left: 5px;
    color: white;
    font-size: calc(((2.2vh + 2.2vw) / 2.5));
  }
`;

const QueDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${(props) => {
      if (props.queOpen && !props.chatOpen) {
         return css`
        height: 60%;
      `;
      } else if (props.queOpen && props.chatOpen) {
         return css`
        height: 36%;
      `;
      }
   }}
  margin-bottom: 2vh;
  border-radius: 5px;
  border-right: 6px solid #a0935c;
  border-left: 6px solid #fffae3;
  border-bottom: 6px solid #a0935c;
  background-color: #111823;
`;

const QueHead = styled.div`
  display: flex;
  align-items: center;
  width: 100.4%;
  height: 4vh;
  margin-top: -0.2vh;
  background-color: #5777ce;
  border-top: 4px solid #c0cfff;
  border-left: 4px solid #c0cfff;
  border-right: 4px solid #c0cfff;
  border-bottom: 4px solid black;
  border-radius: 5px;
  p {
    padding-left: 5px;
    color: white;
    font-size: calc(((2.2vh + 2.2vw) / 2.5));
  }
`;

const QueBox = styled.div`
  width: 98%;
  height: 90%;

  margin-left: 0.3vw;
  padding: 5px;
  color: lightgray;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #fff;
    border: 0.3px solid #fff;
    border-radius: 5vw;
  }
  &::-webkit-scrollbar-track {
    background-color: #0000003a;
  }
  p {
    margin-top: -0.5vh;
    color: lightgray;
    line-height: 1.5;
    font-size: calc((2vw + 2vh) / 3);
  }
  div {
    height: 90%;
    padding: -1vh 0;
    color: lightgray;
    line-height: 1.5;
    font-size: calc((2vw + 2vh) / 3);
  }
`;

const CodeDiv = styled.div`
  width: 99.6%;

  ${(props) => {
      if (props.queOpen && !props.chatOpen) {
         return css`
        height: 35.5%;
      `;
      } else if (props.queOpen && props.chatOpen) {
         return css`
        height: 19.5%;
      `;
      } else if (!props.queOpen && props.chatOpen) {
         return css`
        height: 60%;
      `;
      } else {
         return css`
        height: 100%;
      `;
      }
   }}
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 5px 5px;
  border-top: 7px solid #fffae3;
  border-left: 7px solid #fffae3;
  border-right: 7px solid #c1b78e;
  border-bottom: 7px solid #a0935c;
`;

export default Battle;
