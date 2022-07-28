import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Modal from "react-modal";

/*COMPONENTS*/
import Control from "./Control.js";
import {
  QuestionModal,
  SuccessModal,
  FailModal,
  Result,
  GameRuleModal,
} from "./components/Modals.js";
import ProBar from "./components/ProBar.js";
import Alert from "./components/Alert.js";
import Countdown from "./components/CountDown.js";
import HeaderBtn from "./components/HeaderBtn.js";
import QueChatEditDiv from "./components/QueChatEditDiv.js";
import UserCompoDiv from "./components/UserCompoDiv.js";

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
import { addchatlist, deletechatlist } from "../../redux/modules/chatlist.js";

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
  setTrySub,
} from "../../redux/modules/battleFunction.js";

//webRtc
import Peer from "peerjs";
import { setPeerId, setRoomId } from "../../redux/modules/user.js";
import { OpCam, UserCam } from "./components/PeerCam.js";
import { history } from "../../shared/History.js";
Modal.setAppElement("#root");
const api = process.env.REACT_APP_API;
const Authorization = sessionStorage.getItem("Authorization");

const Battle = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selected = useSelector((state) => state.user.selected);
  const location = useLocation();

  const logout = () => {
    axios({
      url: `${api}/chinda/logout`,
      method: "GET",
      headers: { Authorization: Authorization },
    })
      .then((res) => {
        console.log(res);
        sessionStorage.clear();
        localStorage.clear();
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //GameStart
  const gameStart = useSelector((state) => state.battleFunction.gameStatus);
  const gameStartRef = useRef(null);
  gameStartRef.current = gameStart;
  const que = useSelector((state) => state.battleFunction.queList);

  useEffect(() => {
    const listenBackEvent = () => {
      BackToMain();
      window.alert("방을 나갑니다.");
    };

    const unlistenHistoryEvent = history.listen(({ action }) => {
      if (action === "POP") {
        listenBackEvent();
      }
    });

    return unlistenHistoryEvent;
  }, []);

  window.onbeforeunload = (e) => {
    e.preventDefault();
    e.returnValue = "";
    return BackToMain();
  };

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
  const roomId = location.state.roomId;
  const server = location.state.server;
  const roomuser = location.state.creatorGameInfo.playerName;

  useEffect(() => {
    if (roomuser !== username) {
      dispatch(NewOp(roomuser));
    }
  }, []);

  //Timer,ProgressBar
  dispatch(setLevel(selected.level));

  //Toastify Alert
  const resAlert = (r) => {
    dispatch(setMsg(r));
    dispatch(setAlert(true));
  };

  //Peer
  const peerId = useSelector((state) => state.user.peerId.userId);
  const remotePeerIdValue = useSelector((state) => state.user.peerId.opId);

  const remoteVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerRef = useRef("");
  peerRef.current = peerId;
  const forPeer = useRef(0);

  //get peerId
  useEffect(() => {
    const peer = new Peer();
    peer.on("open", (id) => {
      dispatch(setPeerId({ userId: id }));
    });

    peer.on("call", (call) => {
      let getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ /*audio: true,*/ video: true }, (mediaStream) => {
        call.answer(mediaStream);
      });
    });

    peerInstance.current = peer;
  }, []);

  //Peer call function
  const call = (remotePeerId) => {
    let getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ audio: false, video: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      let playPromise = currentUserVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then((_) => {})
          .catch((error) => {
            console.log(error);
          });
      }
      if (
        remotePeerIdValue !== "" &&
        remotePeerIdValue !== undefined &&
        remotePeerIdValue !== null
      ) {
        const call = peerInstance.current.call(remotePeerId, mediaStream);
        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      }
    });
  };

  useEffect(() => {
    console.log("연결", remotePeerIdValue);
    call(remotePeerIdValue);
  }, [remotePeerIdValue]);

  //For game server
  const username = sessionStorage.getItem("username");
  const headers = { Authorization: Authorization };

  let sock = new SockJS(`${api}/ws-stomp?username=` + encodeURI(username));
  let client = StompJS.over(sock);

  const opCode = useRef();
  const codeRef = useRef("");
  // WebSocket Server connect UseEffect

  React.useEffect(() => {
    connect();
    Chatconnect();
    dispatch(alreadyUser({ user: false, opp: false }));
    return () => {
      peerInstance.current.destroy();
      dispatch(setRoomId(""));
      // when disconnecting to game and chatting server
      // dispatch(NewQue({ question: "", questionTitle: "", questionId: "" }));
      dispatch(ModalOpen({ chat: true, que: false, rule: true }));
      dispatch(setPeerId({ userId: "", opId: "" }));
      dispatch(NewOp(""));
      // dispatch(gameSwitch(false));
      if (gameStartRef.current === true) {
        exitLose();
        exitMes();
      } else {
        exitMes();
      }
      setTimeout(() => {
        console.log("게임서버 연결종료");
        client.disconnect();
        dispatch(gameSwitch(false));
      }, 500);

      ExitSend();
      setTimeout(() => {
        console.log("채팅 연결종료");
        clientChat.disconnect();
        dispatch(deletechatlist());
      }, 500);
    };
  }, []);

  //Game server connect
  const connect = () => {
    client.connect(headers, onConnected, onError);
    client.reconnect_delay = 3000;
    client.heartbeat.outgoing = 20000;
    client.heartbeat.ingoing = 0;
  };

  // Callback Function for connection on Game server
  const onConnected = () => {
    client.subscribe(`/topic/game/room/${roomId}`, ReceiveCallBack); // For game flow
    client.subscribe(`/user/queue/game/codeMessage/${roomId}`, ReceiveCallBack); // For sending code to Opponent
  };

  // Callback Function for Gameserver
  const ReceiveCallBack = (message) => {
    if (message.body) {
      const mes = JSON.parse(message.body);
      console.log(mes);
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
            dispatch(NewOp(mes.playerName));
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
          dispatch(alreadyUser({ user: false }));
          dispatch(NewOp(undefined));
          resAlert(mes.msg);
          newMesEs.play();
          break;
        default:
      }
    } else {
      alert("error");
    }
  };

  // Callback function when failing connecting server
  const onError = (err) => {
    console.log(err);
  };

  //Ready for game message
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

  //Live Code sending to opp
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

  //Compile Failed 3 times Lose message
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

  //Timeout lose message
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

  //Lose Message when leaving during gaming
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

  //Game server Exit
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

  //About Chatting server
  const ChatApi = process.env.REACT_APP_API_CHAT;

  let socket = new SockJS(`${ChatApi}/ws-stomp?name=` + encodeURI(username));
  let clientChat = StompJS.over(socket);

  // Chat server connect
  const Chatconnect = () => {
    clientChat.connect({}, onConnect, onError);
    clientChat.reconnect_delay = 3000;
    clientChat.heartbeat.outgoing = 20000;
    clientChat.heartbeat.ingoing = 0;
  };

  // Chat server connect Callback Function
  const onConnect = () => {
    clientChat.subscribe(`/sub/chat/room/${roomId}`, ReceiveFunc);
    setTimeout(() => {
      EnterSend();
    }, 2000);
  };

  //Chatting Message Send
  const EnterSend = () => {
    clientChat.send(
      `/pub/chat/message`,
      {},
      JSON.stringify({
        type: "ENTER",
        roomId: roomId,
        sender: username,
        id: peerRef.current,
      })
    );
  };

  const ExitSend = () => {
    forPeer.current = 0;
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

  //Receive CallBack Function
  const ReceiveFunc = (message) => {
    if (message.body) {
      newMesEs.play();
      const mes = JSON.parse(message.body);
      switch (mes.type) {
        case "ENTER":
          if (mes.sender !== username && forPeer.current === 0) {
            dispatch(
              addchatlist({
                type: mes.type,
                message: mes.message,
                sender: mes.sender,
              })
            );
          }
          if (mes.sender !== username) {
            if (remotePeerIdValue !== mes.id) {
              dispatch(
                setPeerId({
                  opId: mes.id,
                })
              );
            }
            console.log(remotePeerIdValue);
            if (forPeer.current < 1) {
              forPeer.current++;
              EnterSend();
            }
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
          if (mes.sender !== username) {
            dispatch(
              setPeerId({
                opId: "",
              })
            );
          }
          forPeer.current = 0;
          break;
        default:
      }
    } else {
      alert("error");
    }
  };

  //Submit
  const trySub = useSelector((state) => state.battleFunction.trySub);
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
          if (trySub === 1) {
            dispatch(setTrySub(trySub - 1));
            compileFailedLose();
            setTimeout(() => setShowFailModal(true), 500);
          } else {
            dispatch(setTrySub(trySub - 1));
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

  //Modals
  const modal = useSelector((state) => state.battleFunction.modalOpen);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);

  //AceEditor
  const langType = ["java", "javascript", "python"];
  const mode = langType[parseInt(selected.language)];

  //Open Resutl Modal
  const [rOpen, setROpen] = useState(false);
  const [result, setResult] = useState("WIN");

  //ROOM EXIT AXIOS
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
        console.log(response);
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
          logout();
          window.location.replace("/");
        }
      });
  };

  //Exit Function
  const BackToMain = () => {
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
          <HeaderBtn BackToMain={BackToMain} />
        </BtnDiv>
      </HeadPart>
      <BodyPart>
        <UserDiv>
          <UserCompoDiv
            gameStart={gameStart}
            sendReady={sendReady}
            mode={mode}
            codeRef={codeRef}
            onSubmit={onSubmit}
          />
          <UserCam camEs={camEs} currentUserVideoRef={currentUserVideoRef} />
        </UserDiv>
        <OpponentDiv>
          <QueChatEditDiv
            que={que}
            roomId={roomId}
            username={username}
            gameStart={gameStart}
            mode={mode}
            opCode={opCode}
          />
          <OpCam
            camEs={camEs}
            remoteVideoRef={remoteVideoRef}
            remotePeerIdValue={remotePeerIdValue}
          />
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
  margin-top: 3px;
  justify-content: space-evenly;
  height: 100%;
  width: 45.125vw;
  border: 1px solid red;
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
  height: 105%;
  width: 45.125vw;
  margin: 0;
  padding: 0;
`;

export default Battle;
