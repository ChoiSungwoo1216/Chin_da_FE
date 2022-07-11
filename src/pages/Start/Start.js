import React from "react";
import LoginModal from "./components/LoginModal";
import styled, { keyframes } from "styled-components";

const Start = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const open = () => {
    setModalOpen(true);
  };
  const close = () => {
    setModalOpen(false);
  };
  return (
    <StartContainer>
      <StartLogo>
        <span>친 다</span>
      </StartLogo>

      <LoginDiv>
        <BtnL onClick={open} />
        <BtnO onClick={open} />
        <BtnG onClick={open} />
        <BtnI onClick={open} />
        <BtnN onClick={open} />
      </LoginDiv>
      <LoginModal open={modalOpen} close={close} />
    </StartContainer>
  );
};

export default Start;

const BtnMotion = keyframes`
 0%{
  margin-top:0px;
 }
 50%{
  margin-top:20px;
 }
 100%{
  margin-top:0px;
 }
`;

const BtnCombine = keyframes`
 0%{
  top:0;
 }
 50%{
 }
 100%{
  top:0;
 }
`;

const StartContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  align-items: center;

  width: 100vw;
  height: 100vh;
  overflow: hidden;

  z-index: 1;
`;

const StartLogo = styled.div`
  position: relative;
  display: flex;

  text-align: center;

  justify-content: center;
  flex-direction: column;

  background: url("/img/logo_test.jpg") center no-repeat;
  background-size: 100% 100%;
  border-radius: 10px;

  /* background: -webkit-linear-gradient(white, #38495a); */
  /* background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */

  font-size: 15vmin;

  width: 41.64%;
  height: 20.08%;
  top: 23.61%;
  overflow: hidden;
  opacity: 0;
  box-sizing: border-box;

  animation: zoomin 1s linear forwards, shadowGrow 1.5s infinite none;
  animation-delay: 1s, 2.5s;
`;

const LoginDiv = styled.div`
  /* background-position: center;
  background-size: 100%, 100%;
  background-image: url("/img/login_btn_white.svg");
  background-repeat: no-repeat; */

  display: flex;
  position: relative;
  align-items: center;

  width: 19.16%;
  height: 8.13%;

  margin: auto;

  animation: zoomin 1s linear 2s forwards;
  opacity: 0;

  top: 8.01%;

  & span {
    width: 3.125vw;
    height: 3.125vw;

    display: flex;
    position: relative;
    justify-content: space-between;

    margin-left: 0.5vw;
    margin-right: 0.5vw;

    animation: ${BtnMotion} 1s linear 3s infinite;

    background-position: center;
    background-size: 100%, 100%;
    background-repeat: no-repeat;

    cursor: pointer;
    &:hover {
      transform: rotate(20deg) translateY(-10px);
      transition: 1s linear;
      z-index: 1;
      width: 19.16vw;
      height: 8.13vw;
      background-image: url("/img/login_btn_black.svg");
      content: "start?";
    }

    &:nth-child(1) {
      animation-delay: 3.2s;
    }
    &:nth-child(2) {
      animation-delay: 3.4s;
    }
    &:nth-child(3) {
      animation-delay: 3.6s;
    }
    &:nth-child(4) {
      animation-delay: 3.8s;
    }
    &:nth-child(5) {
      animation-delay: 4s;
    }
  }
`;

const Btn = styled.span``;
const BtnL = styled(Btn)`
  background-image: url("/img/login_L.svg");
`;
const BtnO = styled(Btn)`
  background-image: url("/img/login_O.svg");
  top: 10px;
`;
const BtnG = styled(Btn)`
  background-image: url("/img/login_G.svg");
  top: -10px;
`;
const BtnI = styled(Btn)`
  background-image: url("/img/login_I.svg");
`;
const BtnN = styled(Btn)`
  background-image: url("/img/login_N.svg");
  transform: rotate(20deg);
`;
