import React from "react";
import styled from "styled-components";
import { QuestionModal, SuccessModal, FailModal } from "./components/Modals";

const Control = (props) => {
  const {
    setRunTimer,
    setShowQuestionModal,
    setShowSuccessModal,
    setShowFailModal,
    setRunAlert,
    setROpen,
    setTimeSetting,
    setMesAlert,
    remotePeerIdValue,
    setRemotePeerIdValue,
    call,
    peerId,
    setRunCountdown,
  } = props;
  console.log(props.peerId);

  const onCountdown = () => {
    setRunCountdown(true);
    const countdown = setInterval(() => {
      setRunCountdown(false);
      setShowQuestionModal(true);
      clearInterval(countdown);
    }, 3000);
    return () => clearInterval(countdown);
  };

  const AlertMes = () => {
    setMesAlert("Fail");
    setRunAlert(true);
  };
  return (
    <ControlDiv>
      <div>
        카운트 시작
        <button onClick={onCountdown}>카운트</button>
      </div>
      <div>
        타이머 시작
        <button onClick={() => setRunTimer(true)}>시작</button>
        <button onClick={() => setRunTimer(false)}>끝</button>
      </div>
      <div>
        시간 조작
        <button onClick={() => setTimeSetting(300)}>하 5분</button>
        <button onClick={() => setTimeSetting(600)}>중 10분</button>
        <button onClick={() => setTimeSetting(900)}>상 15분</button>
      </div>
      <div>
        모달창 오픈
        <button onClick={() => setShowQuestionModal(true)}>열기</button>
        <button onClick={() => setShowQuestionModal(false)}>닫기</button>
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
        Peer 관련
        <div>peerId : {props.peerId}</div>
        <input
          type="text"
          value={props.remotePeerIdValue}
          onChange={(e) => setRemotePeerIdValue(e.target.value)}
        />
        <button onClick={() => call(props.remotePeerIdValue)}>Call</button>
      </div>
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
