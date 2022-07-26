import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Modal from "react-modal";

/*COMPONENTS*/
import Control from "./Control";
import {
   QuestionModal,
   SuccessModal,
   FailModal,
   Result,
   GameRuleModal,
} from "./components/Modals";
import ProBar from "./components/ProBar";
import Alert from "./components/Alert";
import Countdown from "./components/CountDown";
import HeaderBtn from "./components/HeaderBtn";
import QueChatEditDiv from "./components/QueChatEditDiv";
import UserCompoDiv from "./components/UserCompoDiv";

/*AUDIO*/
import useSound from "../../shared/useSound";
import effectSound from "../../shared/effectSound";
import btnSound from "../../audios/btnselect.mp3";
import camSound from "../../audios/camOff.mp3";
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
   NewQue,
   NewOp,
} from "../../redux/modules/battleFunction";

//webRtc
import Peer from "peerjs";
import { setPeerId } from "../../redux/modules/user";
import { OpCam, UserCam } from "./components/PeerCam";


Modal.setAppElement("#root");

const Battle = (props) => {
   const api = process.env.REACT_APP_API;
   const Authorization = sessionStorage.getItem("Authorization");

   const selected = useSelector((state) => state.user.selected);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();
   const params = useParams();

   //Peer
   const peerId = useSelector((state) => state.user.peerId.userId);
   const remotePeerIdValue = useSelector((state) => state.user.peerId.opId);
   console.log("내: ",peerId, "상대: ", remotePeerIdValue)
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
   const camEs = effectSound(camSound, userSound.es);

   //RoomInfo
   const roomId = params.id;
   const server = location.state.server;
   const roomuser = location.state.creatorGameInfo.playerName;
   useEffect(() => {
      if (roomuser !== username) {
         dispatch(NewOp(roomuser))
      }
   }, [])

   //Timer,ProgressBar
   dispatch(setLevel(selected.level));

   //GameStart
   const gameStart = useSelector((state) => state.battleFunction.gameStatus);

   //Toastify Alert
   const resAlert = (r) => {
      dispatch(setMsg(r));
      dispatch(setAlert(true));
   };

   //Peer
   const remoteVideoRef = useRef(null);
   const peerInstance = useRef(null);
   const currentUserVideoRef = useRef(null);

   useEffect(() => {
      const peer = new Peer();
      //제일 처음 peer가 만들어지면서 랜덤한 id가 만들어짐
      peer.on("open", (id) => {
         dispatch(setPeerId({ userId: id }))
      });

      peer.on("call", (call) => {
         var getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

         getUserMedia({ audio: false, video: true }, (mediaStream) => {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();
            call.answer(mediaStream);
            call.on("stream", (remoteStream) => {
               remoteVideoRef.current.srcObject = remoteStream;
               remoteVideoRef.current.play();
            });
         });
      });

      peerInstance.current = peer;
   }, []);

   const call = (remotePeerId) => {
      var getUserMedia =
         navigator.getUserMedia ||
         navigator.webkitGetUserMedia ||
         navigator.mozGetUserMedia;

      getUserMedia({ audio: false, video: true }, (mediaStream) => {
         //현재 내 화면
         currentUserVideoRef.current.srcObject = mediaStream;
         currentUserVideoRef.current.play();

         const call = peerInstance.current.call(remotePeerId, mediaStream);

         call.on("stream", (remoteStream) => {
            // Show stream in some video/canvas element.
            // 상대방 영상 받아오는 부분
            // 두개 같이 써줘야 작동함
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
         });
      });
   };
   console.log("상대 PeerId : ",remotePeerIdValue);
   useEffect(() => {
      call(remotePeerIdValue)
   }, [remotePeerIdValue])

   //game server
   const username = sessionStorage.getItem("username");
   const headers = { Authorization: Authorization };
   let sock = new SockJS(`${api}/ws-stomp?username=` + encodeURI(username));
   let client = StompJS.over(sock);
   const opCode = useRef();
   const que = useSelector((state) => state.battleFunction.queList);
   const codeRef = useRef("");
   React.useEffect(() => {
      if (roomId !== undefined) {
         connect();
         Chatconnect();
         dispatch(alreadyUser({ user: false, opp: false }));
         return () => {
            dispatch(NewQue({ question: "", questionTitle: "", questionId: "" }));
            dispatch(ModalOpen({ chat: true, que: false, rule: true }));
            dispatch(gameSwitch(false));
            dispatch(setPeerId({userId: "", opId: ""}));
            exitMes();
            setTimeout(() => {
               console.log("게임서버 연결종료")
               client.disconnect();
               dispatch(gameSwitch(false));
            }, 500);

            ExitSend();
            setTimeout(() => {
               console.log("채팅 연결종료")
               clientChat.disconnect();
               dispatch(deletechatlist());
            }, 500);
         };
      }
   }, [roomId]);

   //서버 연결
   const connect = () => {
      client.connect(headers, onConnected, onError);
      client.reconnect_delay = 3000;
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
         console.log(mes)
         switch (mes.type) {
            case "READY":
               dispatch(NewQue({ question: mes.question }));
               dispatch(NewQue({ questionTitle: mes.title }));
               dispatch(NewQue({ questionId: mes.questionId }));
               codeRef.current =
                  "//함수와 변수를 임의로 변경하지 마세요" +
                  `\n` +
                  "//출력문을 입력하지 마세요" +
                  `\n` +
                  mes.template;
               dispatch(alreadyUser({ opp: true }));
               dispatch(gameSwitch(true));
               break;
            case "USERINFO":
               if (mes.sender !== username) {
                  newOpEs.play();
                  resAlert("상대 입장");
                  dispatch(NewOp(mes.playerName))
               }
               break;
            case "GAME":
               opCode.current = mes.message;
               break;
            case "LOSE":
               setShowFailModal(true);
               break;
            case "FAIL":
               resAlert(mes.msg);
               noItemEs.play();
               break;
            case "WIN":
               setShowSuccessModal(true);
               break;
            case "EXIT":
               dispatch(alreadyUser({ user: false }))
               dispatch(NewOp(undefined))
               resAlert(mes.msg);
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

   const sendCode = () => {
      client.send(
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
         setTimeout(() => sendCode(), 300);
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
      setTimeout(() => {
         setShowFailModal(true);
      }, 500);
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
      setTimeout(() => { EnterSend(); }, 200);
   };

   const EnterSend = () => {
      console.log("내 PeerId : ",peerId);
      clientChat.send(
         `/pub/chat/message`,
         {},
         JSON.stringify({
            type: "ENTER",
            roomId: roomId,
            sender: username,
            id: peerId,
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
         console.log(mes)
         switch (mes.type) {
            case "ENTER":
               dispatch(
                  addchatlist({
                     type: mes.type,
                     message: mes.message,
                     sender: mes.sender,
                  })
               );
               if (mes.sender !== username) {
                  dispatch(
                     setPeerId({
                        opId: mes.id,
                     })
                  );
               }
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
            console.log(response)
            setBbmute(true);
            setMbmute(false);
            btnEs.play();
            navigate(`/Main`);
         })
         .catch((error) => {
            console.log(error);
            if (error.response.status === 400) {
               window.alert(error.response.data);
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
   const [showQuestionModal, setShowQuestionModal] = useState(false);
   const [showSuccessModal, setShowSuccessModal] = useState(false);
   const [showFailModal, setShowFailModal] = useState(false);

   //AceEditor
   const langType = ["java", "javascript", "python"];
   const mode = langType[parseInt(selected.language)];

   //Submit
   const [trySub, setTrySub] = useState(3);
   const axiosSubmit = () => {
      axios({
         url: "/api/compile",
         method: "POST",
         baseURL: api,
         data: {
            roomId: roomId,
            questionId: que.questionId,
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
                  setTimeout(() => setShowFailModal(true), 500);
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

   // header Modal
   const modal = useSelector((state) => state.battleFunction.modalOpen);

   //결과창 열기
   const [rOpen, setROpen] = useState(false);
   const [result, setResult] = useState("WIN");

   //나가기
   const BackToMain = () => {
      if (gameStart === true) {
         exitLose();
      }
      leaveRoomAxios();
   };

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
            </BtnDiv>
         </HeadPart>
         <BodyPart>
            <UserDiv>
               <UserCompoDiv gameStart={gameStart} sendReady={sendReady} mode={mode} codeRef={codeRef} onSubmit={onSubmit} trySub={trySub} />
               <UserCam camEs={camEs} call={call} currentUserVideoRef={currentUserVideoRef} remotePeerIdValue={remotePeerIdValue} />
            </UserDiv>
            <OpponentDiv>
               <QueChatEditDiv que={que} roomId={roomId} username={username} gameStart={gameStart} mode={mode} opCode={opCode} />
               <OpCam camEs={camEs} call={call} remoteVideoRef={remoteVideoRef} remotePeerIdValue={remotePeerIdValue} />
            </OpponentDiv>
         </BodyPart>
         {showQuestionModal === true && (
            <QuestionModal setValue={setShowQuestionModal} que={que} />
         )}
         {showSuccessModal === true && (
            <SuccessModal
               setShowSuccessModal={setShowSuccessModal}
               setROpen={setROpen}
               setResult={setResult}
               setBbmute={setBbmute}
            />
         )}
         {showFailModal === true && (
            <FailModal
               setShowFailModal={setShowFailModal}

               setROpen={setROpen}
               setResult={setResult}
               setBbmute={setBbmute}
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
               codeRef={codeRef}
               opCode={opCode}
            />
         )}

         <Control
            setShowQuestionModal={setShowQuestionModal}
            setShowSuccessModal={setShowSuccessModal}
            setShowFailModal={setShowFailModal}
            setROpen={setROpen}
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

const OpponentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 102.1%;
  width: 45.125vw;
  margin: 0;
  padding: 0;
`;

export default Battle;