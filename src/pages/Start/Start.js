import React, { useState } from "react";
import LoginModal from "./components/LoginModal";
import styled, { keyframes, css } from "styled-components";
import "./startAnimation.css";

const Start = ({setMMute}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [HOVER, setHOVER] = useState(false);
  const [timing, setTiming] = useState(false);

  const open = () => {
    setModalOpen(true);
  };
  const close = () => {
    setModalOpen(false);
  };
  const bgmOn =() =>{
    setMMute(false);
  }
  React.useEffect(() => {
    bgmOn();
    setInterval(() => {
      setTiming(true);
    }, 5000);
  }, []);
  return (
    <StartContainer>
      <LogoContainer>
        <StartLogo>
          <Fist />
          <Dust />
          <Title />
        </StartLogo>
      </LogoContainer>

      <LoginDiv
        HOVER={HOVER}
        timing={timing}
        onMouseOut={() => {
          setHOVER(false);
        }}
        onClick={(HOVER === true) ? open : undefined}
      >
        {HOVER === false && (
          <>
            <BtnL
              onMouseOver={() => {
                setHOVER(true);
              }}
              HOVER={HOVER}
            />
            <BtnO
              onMouseOver={() => {
                setHOVER(true);
              }}
              HOVER={HOVER}
            />
            <BtnG
              onMouseOver={() => {
                setHOVER(true);
              }}
              HOVER={HOVER}
            />
            <BtnI
              onMouseOver={() => {
                setHOVER(true);
              }}
              HOVER={HOVER}
            />
            <BtnN
              onMouseOver={() => {
                setHOVER(true);
              }}
              HOVER={HOVER}
            />
          </>
        )}
      </LoginDiv>
      <LoginModal open={modalOpen} close={close} />
    </StartContainer>
  );
};

export default Start;

const StartContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  width: 100vw;
  min-height: 500px;
  height: 100vh;
  /* background-color: lightgray; */
  z-index: 1;
  top: 0;
  left: 0;
  overflow: hidden;
`;
const zoomIn = keyframes`
  0% {
    transform:scale(0,0);
    opacity: 0;
    &:last-child() {
      transform: rotate(20deg);
    }
  }
  100% {
    transform:scale(1,1);
    opacity: 1;
  }
`;
const loginUp = keyframes`
  0% {
    transform:scale(0,0) translateY(-500px);
    opacity: 1;

  }
  100% {
    transform:scale(1,1) translateY(0);
    opacity: 1;

  }
`;
const BtnMotion = keyframes`
 0%{
  margin-top:0px;
  &:last-child() {
      transform: rotate(20deg);
    }
 }
 50%{
  margin-top:20px;
 }
 100%{
  margin-top:0px;
  &:last-child() {
      transform: rotate(20deg);
    }
 }
`;

const Btn = styled.span``;

const LogoContainer = styled.div`
  position: relative;
  display: flex;

  width: 23.6%; //35.16vw = 450px, 27.34vw = 350px, 19.53vw=250px, 23.44vw=300px, 62:38
  height: 23.6vw;
  top: 22.06vh;

  /* border: 1px solid red; */
`;
const StartLogo = styled.div`
  position: relative;
  display: flex;

  text-align: center;
  justify-content: center;
  flex-direction: column;

  background: url("/img/logo_badge_blue.svg") center no-repeat;
  background-size: 100% 100%;

  /* font-size: 15vmin; */

  width: 100%; //35.16vw = 450px, 27.34vw = 350px, 19.53vw=250px, 23.44vw=300px 62:38
  height: 100%;

  opacity: 0;

  background-color: transparent;

  animation: ${zoomIn} 1s ease-in forwards, logoChange 3s linear 2s infinite;

  padding: 0px;
  z-index: -1;
`;

// const Shadow = styled.div`
//   position: relative;
//   display: flex;
//   width: 19.53%;
//   height: 19.53vw;

//   top: 6.25%;
//   left: 12.5%;
//   /* left: 43vw;
//   top: 32%; */
//   border: 1px solid blue;

//   background-color: transparent;
//   border-radius: 50%;
//   animation: shadowGrow 1.5s infinite none;
//   z-index: -1;
// `;

const Fist = styled.div`
  position: absolute;
  display: flex;

  width: 7.81vw;
  height: 14.76vw;
  top: -13%;
  left: 38%;
  opacity: 0;
  background: url("/img/fist_fire_left.svg") center no-repeat;
  background-size: 100% 100%;
  z-index: 1;

  animation: fistMovingX 2s ease-in-out, fistMovingY 2s ease-in-out 2s forwards,
    fistChange 0.5s 4s steps(1) infinite;

  /* fistChange 0.5s steps(1) infinite; */
`;

const Dust = styled.div`
  position: absolute;
  display: flex;
  align-items: center;

  width: 19.65vw;
  height: 4.44vw;

  bottom: 35%;
  left: 1.95vw;
  opacity: 0;
  background: url("/img/logo_dust.svg") center no-repeat;
  background-size: 100% 100%;
  animation: dustChange 2s infinite 3.5s;
  transition: none;
`;

const Title = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;

  width: 27.34vw;
  height: 7.81vw; //13.89vh

  top: 62.5%;
  left: -1.95vw;
  opacity: 0;

  background: url("/img/logo_title_fill.svg") center no-repeat;
  background-size: 100%, 100%;
  animation: OPACITY 0.1s 2.5s forwards, titleChange 0.5s infinite 1.7s steps(2);
`;

const LoginDiv = styled.div`
  ${(props) =>
    props.HOVER === true &&
    css`
      background: url("/img/login_LOGIN.svg") center no-repeat;
      background-size: 100%, 100%;
      cursor: pointer;
    `}
  display: flex;
  position: relative;
  align-items: center;

  width: 19.16%;
  height: 8.13%;
  margin-top: 30vh;

  animation: OPACITY 0.1s linear 3s forwards;
  opacity: 0;

  /* top: 10vmin; */

  & span {
    width: 3.125vw;
    height: 3.125vw;
    display: flex;
    position: relative;
    justify-content: space-between;
    opacity: 0;
    margin-left: 0.5vw;
    margin-right: 0.5vw;

    background-position: center;
    background-size: 100%, 100%;
    background-repeat: no-repeat;
    overflow-y: hidden;
    cursor: pointer;

    ${(props) =>
    props.timing === false
      ? css`
            pointer-events: none;
            animation: ${BtnMotion} 1s linear infinite,
              ${loginUp} 1s linear forwards;
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
              transform: rotate(20deg);
            }
          `
      : css`
            animation: ${BtnMotion} 1s linear infinite forwards;
            opacity: 1;
            &:nth-child(1) {
              animation-delay: 0.2s;
            }
            &:nth-child(2) {
              animation-delay: 0.4s;
            }
            &:nth-child(3) {
              animation-delay: 0.6s;
            }
            &:nth-child(4) {
              animation-delay: 0.8s;
            }
            &:nth-child(5) {
              animation-delay: 1s;
              transform: rotate(20deg);
            }
          `}
  }
`;

const BtnL = styled(Btn)`
  background-image: url("/img/login_L.svg");
`;
const BtnO = styled(Btn)`
  background-image: url("/img/login_O.svg");
`;
const BtnG = styled(Btn)`
  background-image: url("/img/login_G.svg");
`;
const BtnI = styled(Btn)`
  background-image: url("/img/login_I.svg");
`;
const BtnN = styled(Btn)`
  background-image: url("/img/login_N.svg");
`;
