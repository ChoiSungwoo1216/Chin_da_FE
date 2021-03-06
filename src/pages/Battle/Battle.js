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

import { alreadyUser } from "../../redux/modules/user";

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
  console.log(info);

  //Timer,ProgressBar
  const [runTimer, setRunTimer] = useState("false");
  const [timeSetting, setTimeSetting] = useState(300);
  const timerValue = {
    Time: timeSetting,
    Active: runTimer,
    setActive: setRunTimer,
  };
  const SetTime = () => {
    if (selected.level === "0") {
      setTimeSetting(300);
    } else if (selected.level === "1") {
      setTimeSetting(600);
    } else if (selected.level === "2") {
      setTimeSetting(900);
    } else {
      setTimeSetting(300);
    }
  };
  useEffect(() => {
    SetTime();
  }, []);

  //ReadyUser
  const [gameStart, setGameStart] = useState(false);

  //Toastify Alert
  const [runAlert, setRunAlert] = useState(false);
  const [mesAlert, setMesAlert] = useState("FAIL");
  const resAlert = (r) => {
    setMesAlert(r);
    setRunAlert(true);
  };

  //game server
  const username = sessionStorage.getItem("username");
  const headers = { Authorization: Authorization };
  let sock = new SockJS(`${api}/ws-stomp?username=` + encodeURI(username));
  let client = StompJS.over(sock);
  client.heartbeat.outgoing = 20000;
  const [opCode, setOpCode] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [question, setQuestion] = useState("");
  const codeRef = useRef("");

  React.useEffect(() => {
    if (roomId !== undefined) {
      connect();
      Chatconnect();
      return () => {
        dispatch(deletechatlist());
        client.disconnect();
        clientChat.disconnect();
      };
    }
  }, [roomId]);

  //?????? ??????
  const connect = () => {
    client.connect(headers, onConnected, onError);
  };
  // ?????? ?????? ?????? ??? ????????????
  const onConnected = () => {
    client.subscribe(`/topic/game/room/${roomId}`, ReceiveCallBack); //????????? ?????? ?????? ??????, ready ?????? ??????
    client.subscribe(`/user/queue/game/codeMessage/${roomId}`, ReceiveCallBack); //????????? ?????? ?????? ?????? ??????
  };

  const ReceiveCallBack = (message) => {
    if (message.body) {
      const mes = JSON.parse(message.body);
      console.log(mes);
      switch (mes.type) {
        case "READY":
          setQuestion(mes.question);
          setQuestionTitle(mes.title);
          dispatch(alreadyUser({ opp: true }));
          break;
        case "USERINFO":
          if (mes.sender !== username) {
            newOpEs.play();
            resAlert("?????? ??????");
          }
          break;
        case "GAME":
          setOpCode(mes.message);
          break;
        case "LOSE":
          setShowFailModal(true);
          break;
        case "OPFAIL":
          resAlert(mes.message);
          noItemEs.play();
          break;
        default:
      }
    } else {
      alert("error");
    }
  };

  // ?????? ?????? ?????????
  const onError = (err) => {
    console.log(err);
  };

  //?????? ??????
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

  //????????? ?????? ??????
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

  //????????????
  const [sendT, setSendT] = useState(false);

  const checkT = () => {
    sendT ? setSendT(false) : setSendT(true);
  };

  useEffect(() => {
    if (gameStart === true) {
      setTimeout(() => sendCode(), 500);
    }
  }, [sendT]);

  //?????? ??????
  const ChatApi = process.env.REACT_APP_API_CHAT;

  let socket = new SockJS(`${ChatApi}/ws-stomp?name=` + encodeURI(username));
  let clientChat = StompJS.over(socket);
  clientChat.heartbeat.outgoing = 20000;

  const Chatconnect = () => {
    clientChat.connect({}, onConnect, onError);
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

  //???????????? ??????
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
        console.log(error);
      });
  };

  //Modals
  const [showQuestionModal, setShowQuestionModal] = useState();
  const [showSuccessModal, setShowSuccessModal] = useState();
  const [showFailModal, setShowFailModal] = useState();
  const [showGameRuleModal, setGameRuleModal] = useState();

  //AceEditor
  const langType = ["java", "javascript", "python"];
  const mode = langType[parseInt(selected.language)];

  //CountDown
  const [runCountdown, setRunCountdown] = useState(false);

  //Submit
  const [userPending, setUserPending] = useState(false);
  const [oppPending, setOppPending] = useState(false);
  const [trySub, setTrySub] = useState(3);

  const axiosSubmit = () => {
    setTrySub(trySub - 1);
    axios({
      url: "/api/compile",
      method: "POST",
      baseURL: api,
      data: {
        roomId: roomId,
        questionId: questionId,
        languageIdx: parseInt(selected.language),
        codeStr: codeRef,
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
          if (trySub === 1) {
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
    setUserPending(true);
    setTimeout(() => axiosSubmit(), 1000);
  };

  //???????????? ?????? ??????
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

  //?????? ?????? ??????
  const [chatOpen, setChatOpen] = useState(false);
  const openChat = () => {
    btnEs.play();
    if (chatOpen) {
      setChatOpen(false);
    } else {
      setChatOpen(true);
    }
  };

  //?????? ?????? ??????
  const [queOpen, setQueOpen] = useState(false);
  const openQue = () => {
    btnEs.play();
    if (queOpen) {
      setQueOpen(false);
    } else {
      setQueOpen(true);
    }
  };

  //????????? ??????
  const [rOpen, setROpen] = useState(false);
  const [result, setResult] = useState("WIN");

  //?????????
  const BackToMain = () => {
    leaveRoomAxios();
  };

  //Peer
  // const [peerId, setPeerId] = useState("");
  // const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  // const remoteVideoRef = useRef(null);
  // const peerInstance = useRef(null);
  // const currentUserVideoRef = useRef(null);

  // useEffect(() => {
  //   const peer = new Peer();
  //   //?????? ?????? peer??? ?????????????????? ????????? id??? ????????????
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
  //   //????????? peer ??????????????????
  // }, []);

  // const call = (remotePeerId) => {
  //   var getUserMedia =
  //     navigator.getUserMedia ||
  //     navigator.webkitGetUserMedia ||
  //     navigator.mozGetUserMedia;

  //   getUserMedia({ /*audio: true,*/ video: true }, (mediaStream) => {
  //     //?????? ??? ??????
  //     currentUserVideoRef.current.srcObject = mediaStream;
  //     currentUserVideoRef.current.play();

  //     const call = peerInstance.current.call(remotePeerId, mediaStream);

  //     call.on("stream", (remoteStream) => {
  //       // Show stream in some video/canvas element.
  //       // ????????? ?????? ???????????? ??????
  //       // ?????? ?????? ????????? ?????????
  //       remoteVideoRef.current.srcObject = remoteStream;
  //       remoteVideoRef.current.play();
  //     });
  //   });
  // };

  // console.log(peerId);

  return (
    <Container>
      {runCountdown === true ? <Countdown /> : null}
      <Alert
        runAlert={runAlert}
        setRunAlert={setRunAlert}
        mesAlert={mesAlert}
      />
      <HeadPart>
        <TimerDiv>
          <ProBar value={timerValue} checkT={checkT} />
        </TimerDiv>
        <BtnDiv>
          <BtnOnOff onClick={openQue} change={queOpen}>
            ??????
          </BtnOnOff>
          <BtnOnOff onClick={openChat} change={chatOpen}>
            ??????
          </BtnOnOff>
          <BtnOnOff onClick={() => setGameRuleModal(true)}>??????</BtnOnOff>
          <ExitBtn onClick={BackToMain}>?????????</ExitBtn>
        </BtnDiv>
      </HeadPart>
      <BodyPart>
        <UserDiv>
          {gameStart === false ? <ReadyUser sendReady={sendReady} /> : null}
          <UserSubmitPending run={userPending} setRun={setUserPending} />
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
            ???&nbsp;&nbsp;&nbsp;&nbsp;???&nbsp;&nbsp;{trySub}&nbsp;/&nbsp;3
          </SubmitBtn>
        </UserDiv>
        <OpponentDiv>
          {queOpen && (
            <QueDiv queOpen={queOpen} chatOpen={chatOpen}>
              <QueHead>Question</QueHead>
              <QueBox>
                {questionTitle}
                <br />
                <br />
                {question}
              </QueBox>
            </QueDiv>
          )}
          {chatOpen && (
            <ChatingDiv>
              <ChatHead>Chatting</ChatHead>
              <ChatBox roomId={roomId} username={username} />
            </ChatingDiv>
          )}
          <CodeDiv queOpen={queOpen} chatOpen={chatOpen}>
            {gameStart === false ? <ReadyOpp /> : null}
            <OppSubmitPending run={oppPending} setRun={setOppPending} />
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
          setRunTimer={setRunTimer}
        />
      )}
      {showFailModal && (
        <FailModal
          setROpen={setROpen}
          setResult={setResult}
          setBbmute={setBbmute}
          setRunTimer={setRunTimer}
        />
      )}
      {showGameRuleModal && <GameRuleModal setClose={setGameRuleModal} />}
      {rOpen && (
        <Result
          setROpen={setROpen}
          result={result}
          setMbmute={setMbmute}
          setGameStart={setGameStart}
          setTrySub={setTrySub}
        />
      )}

      <Control
        setRunTimer={setRunTimer}
        setTimeSetting={setTimeSetting}
        setShowQuestionModal={setShowQuestionModal}
        setShowSuccessModal={setShowSuccessModal}
        setShowFailModal={setShowFailModal}
        setRunAlert={setRunAlert}
        setROpen={setROpen}
        setMesAlert={setMesAlert}
        // remotePeerIdValue={remotePeerIdValue}
        // setRemotePeerIdValue={setRemotePeerIdValue}
        // call={call}
        // peerId={peerId}
        setRunCountdown={setRunCountdown}
        setGameStart={setGameStart}
        setQueOpen={setQueOpen}
        setUserPending={setUserPending}
        setOppPending={setOppPending}
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
  border: 5px solid black;
`;
const ChatHead = styled.div`
  display: flex;
  align-items: center;
  width: 98%;
  height: 15%;
  color: white;
  font-size: calc(((2vh + 2vw) / 2.5));
  padding-left: 10px;
  background-color: #5777ce;
  border-top: 4px solid #c0cfff;
  border-left: 6px solid #c0cfff;
  border-bottom: 4px solid black;
`;
const QueDiv = styled.div`
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
  border: 5px solid black;
`;
const QueHead = styled.div`
  display: flex;
  align-items: center;
  width: 98%;
  height: 4.4vh;
  color: white;
  font-size: calc(((2vh + 2vw) / 2.5));
  padding-left: 10px;
  background-color: #5777ce;
  border-top: 4px solid #c0cfff;
  border-left: 6px solid #c0cfff;
  border-bottom: 4px solid black;
`;
const QueBox = styled.div`
  width: 96.5%;
  height: 88%;
  margin: 0;
  padding: 5px;
  background-color: #111823;
  color: lightgray;
  border-right: 6px solid #a0935c;
  border-left: 6px solid #fffae3;
  border-bottom: 6px solid #a0935c;
  overflow-y: auto;
  line-height: 1.5;
  font-size: calc((2vw + 2vh) / 3);
`;

const CodeDiv = styled.div`
  width: 99%;
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
