import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  alreadyUser,
  gameSwitch,
  setMsg,
  setAlert,
  setCountdown,
  setPending,
  ModalOpen,
  setTrySub,
  resModalOpen,
} from "../../redux/modules/battleFunction.js";
const Control = (props) => {
  const { setMbmute, setBbmute } = props;

  const already = useSelector((state) => state.battleFunction.already);
  const gameStatus = useSelector((state) => state.battleFunction.gameStatus);

  const dispatch = useDispatch();

  const onCountdown = () => {
    dispatch(setCountdown(true));
    setMbmute(true);
    const countdown = setInterval(() => {
      dispatch(setCountdown(false));
      dispatch(resModalOpen({ quest: true }));
      dispatch(alreadyUser({ user: false, opp: false }));
      dispatch(ModalOpen({ chat: false, que: true }));
      setBbmute(false);
      clearInterval(countdown);
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

  const gameStartTrue = () => {
    gameStatus === true && onCountdown();
  };

  const trySubReset = () => {
    gameStatus === false && dispatch(setTrySub(3));
  };

  useEffect(() => {
    alreadyToStart();
  }, [already]);

  useEffect(() => {
    gameStartTrue();
    trySubReset();
  }, [gameStatus]);

  const ReReady = () => {
    dispatch(gameSwitch(false));
    dispatch(alreadyUser({ user: false, opp: false }));
  };
  //pending
  const userPending = () => dispatch(setPending({ user: true }));
  const oppPending = () => dispatch(setPending({ opp: true }));

  return (
    <ControlDiv>
      <div>
        게임
        <button onClick={ReReady}>초기화</button>
        <button onClick={() => dispatch(gameSwitch(true))}>시작</button>
      </div>
      <div>
        문제 모달창 오픈
        <button onClick={() => dispatch(resModalOpen({ quest: true }))}>
          열기
        </button>
      </div>
      <div>
        성공 모달창 on/off
        <button
          onClick={() => {
            dispatch(resModalOpen({ success: true }));
          }}
        >
          열기
        </button>
      </div>
      <div>
        실패 모달창 on/off
        <button onClick={() => dispatch(resModalOpen({ fail: true }))}>
          열기
        </button>
      </div>
      <div>
        알림 on
        <button onClick={AlertMes}>Alert on!</button>
      </div>

      <div>
        제출
        <button onClick={() => userPending()}>user제출</button>
        <button onClick={() => oppPending()}>opp제출</button>
      </div>
    </ControlDiv>
  );
};

export default Control;

const ControlDiv = styled.div`
  display: absolute;
  width: 300px;
  height: 300px;
  background-color: white;
  opacity: 0.5;
  position: fixed;
  z-index: 30;
  bottom: 0;
  left: 0;
`;
