import React, { useEffect } from "react";
import styled from "styled-components";
import { QuestionModal, SuccessModal, FailModal } from "./components/Modals";
import { useDispatch, useSelector } from "react-redux";
import {
  alreadyUser,
  gameSwitch,
  setMsg,
  setAlert,
  setCountdown,
  setPending,
} from "../../redux/modules/battleFunction";
const Control = (props) => {
  const {
    setShowQuestionModal,
    setShowSuccessModal,
    setShowFailModal,
    setROpen,
    // remotePeerIdValue,
    // setRemotePeerIdValue,
    // call,
    // peerId,
    setQueOpen,
    setMbmute,
    setBbmute,
  } = props;

  const already = useSelector((state) => state.battleFunction.already);
  const gameStatus = useSelector((state) => state.battleFunction.gameStatus);
  const dispatch = useDispatch();

  const onCountdown = () => {
    dispatch(setCountdown(true));
    setMbmute(true);
    const countdown = setInterval(() => {
      dispatch(setCountdown(false));
      setShowQuestionModal(true);
      dispatch(alreadyUser({ user: false, opp: false }));
      clearInterval(countdown);
      setQueOpen(true);
      setBbmute(false);
    }, 3150);
    return () => clearInterval(countdown);
  };

  const AlertMes = () => {
    dispatch(setMsg("Fail"));
    dispatch(setAlert(true));
  };

  const alreadyToStart = () => {
    already.user && already.opp === true && dispatch(gameSwitch(true));
  };

  const gameStart = () => {
    gameStatus === true && onCountdown();
  };

  useEffect(() => {
    alreadyToStart();
  }, [already]);

  useEffect(() => {
    gameStart();
  }, [gameStatus]);

  const ReReady = () => {
    dispatch(gameSwitch(false));
  };
  //pending
  const userPending = () => dispatch(setPending({ user: true }));
  const oppPending = () => dispatch(setPending({ opp: true }));

  // useEffect(()=>{
  //   call(props.remotePeerIdValue)
  // },[remotePeerIdValue])

  return (
    <ControlDiv>
      <div>
        게임 초기화
        <button onClick={ReReady}>초기화</button>
      </div>
      <div>
        문제 모달창 오픈
        <button onClick={() => setShowQuestionModal(true)}>열기</button>
        {/* <button onClick={() => setShowQuestionModal(false)}>닫기</button> */}
      </div>
      <div>
        성공 모달창 on/off
        <button onClick={() => setShowSuccessModal(true)}>열기</button>
        <button onClick={() => setShowSuccessModal(false)}>닫기</button>
      </div>
      <div>
        실패 모달창 on/off
        <button onClick={() => setShowFailModal(true)}>열기</button>
        <button onClick={() => setShowFailModal(false)}>닫기</button>
      </div>
      <div>
        알림 on
        <button onClick={AlertMes}>Alert on!</button>
      </div>
      <div>
        결과창 on
        <button onClick={() => setROpen(true)}>열기</button>
      </div>
      <div>
        제출
        <button onClick={() => userPending()}>user제출</button>
        <button onClick={() => oppPending()}>opp제출</button>
      </div>
      {/* <div>
        Peer 관련
        <div>peerId : {props.peerId}</div>
        <input
          type="text"
          value={props.remotePeerIdValue}
          onChange={(e) => setRemotePeerIdValue(e.target.value)}
        />
        <button onClick={() => call(props.remotePeerIdValue)}>Call</button>
      </div> */}
    </ControlDiv>
  );
};

export default Control;

const ControlDiv = styled.div`
  width: 300px;
  height: 300px;
  background-color: white;
  opacity: 0.5;
  position: fixed;
  z-index: 30;
  bottom: 0;
  left: 0;
`;
