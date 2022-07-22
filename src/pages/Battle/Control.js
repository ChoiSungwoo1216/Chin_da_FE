import React, { useEffect } from "react";
import styled from "styled-components";
import { QuestionModal, SuccessModal, FailModal } from "./components/Modals";
import { useDispatch, useSelector } from "react-redux";
import { alreadyUser } from "../../redux/modules/user";
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
    // remotePeerIdValue,
    // setRemotePeerIdValue,
    // call,
    // peerId,
    setRunCountdown,
    setGameStart,
    setQueOpen,
    setUserPending,
    setOppPending,
    setMbmute,
    setBbmute,
  } = props;

  const already = useSelector((state) => state.user.already);
  const dispatch = useDispatch();

  const onCountdown = () => {
    setGameStart(true);
    setRunCountdown(true);
    setMbmute(true)
    const countdown = setInterval(() => {
      setRunTimer(true);
      setRunCountdown(false);
      setShowQuestionModal(true);
      dispatch(alreadyUser({ user: false, opp: false }));
      clearInterval(countdown);
      setQueOpen(true);
      setBbmute(false)
    }, 3150);
    return () => clearInterval(countdown);
  };

  const AlertMes = () => {
    setMesAlert("Fail");
    setRunAlert(true);
  };

  const alreadyToStart = () => {
    already.user && already.opp === true && onCountdown();
  };

  useEffect(() => {
    alreadyToStart();
  }, [already]);

  // useEffect(()=>{
  //   call(props.remotePeerIdValue)
  // },[remotePeerIdValue])

  const ReReady = () =>{
    setGameStart(false)
    dispatch( dispatch(alreadyUser({ user : false })))
  }
  return (
    <ControlDiv>
      <div>
        레디버튼 살려내기
        <button onClick={ReReady}>살려내기</button>
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
        <button onClick={() => setUserPending(true)}>user제출</button>
        <button onClick={() => setOppPending(true)}>opp제출</button>
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
