import React from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import effectSound from "../../../shared/effectSound";
import countDownSound from "../../../audios/CountdownSE1.mp3";

const Countdown = () => {
  const userSound = useSelector((state) => state.user.sound);
  const countDownEs = effectSound(countDownSound, userSound.es);
  React.useEffect(() => {
    countDownEs.play();
  }, []);
  return (
    <>
      <CountContainer>
        <Count></Count>
      </CountContainer>
    </>
  );
};

export default Countdown;

const countNumber = keyframes`
  0% {
    transform: scale(1, 1);
  }
  33.3% {
    counter-increment: my-count -1;
  }
  66.7% {
    counter-increment: my-count -2;
    content: counter(my-count);
    color: rgba(255, 255, 255, 1);
  }
  79.9% {
    transform: scale(1, 1);
  }
  100% {
    color: rgba(255, 255, 255, 1);
    content: "Start!";
  }
`;

const countdownBG = keyframes` 
  0% {
  }
  66.7% {
    background: rgba(0, 0, 0, 0.9);
  }

  100% {
    background: rgba(255, 255, 255, 0);
  }
`;
const CountContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  background: rgba(0, 0, 0, 0.9);
  z-index: 20;
  animation: ${countdownBG} 3000ms linear forwards;
`;

const Count = styled.div`
  color: #fff;

  display: flex;
  position: relative;
  margin: auto;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  counter-reset: my-count 3;

  /* 카운터 변수명, 카운터 수량 선언,*/

  content: "";
  &::after {
    font-size: 4vw;
    animation: ${countNumber} 3150ms linear none;
    content: counter(my-count);
    color: rgba(255, 255, 255, 1);
  }
`;
