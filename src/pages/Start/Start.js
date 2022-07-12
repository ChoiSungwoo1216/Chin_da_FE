import React from "react";
import LoginModal from "./components/LoginModal";
import styled, { keyframes, css } from "styled-components";

const Start = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [HOVER, setHOVER] = React.useState(false);
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

      <LoginDiv
        HOVER={HOVER}
        onMouseOut={() => {
          setHOVER(false);
        }}
        onClick={HOVER === true && open}
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
  position: absolute;
  flex-direction: column;

  align-items: center;

  width: 100vw;
  height: 100vh;
  /* background-color: lightgray; */
  z-index: 1;
  top: 0;
  left: 0;
`;
const zoomIn = keyframes`
  0% {
    transform:scale(0,0);
    opacity: 0;
  }
  50%{
    transform:scale(0.5,0.5);
  }
  100% {
    transform:scale(1,1);
    opacity: 1;
  }
`;

const shadowGrow = keyframes`
  0%{
    box-shadow: 0 20px 50px rgb(23, 32, 90);
  }
  50%{
    box-shadow: 0 20px 70px 30px rgb(40, 60, 110);
  }
  100%{
    box-shadow: 0 20px 50px rgb(23, 32, 90);
  }
`;
const Btn = styled.span``;
const StartLogo = styled.div`
  position: relative;
  display: flex;

  text-align: center;
  border: 1px solid black;
  justify-content: center;
  flex-direction: column;

  background: url("/img/galaxy_background.jpg") center no-repeat;
  background-size: 100% 100%;
  border-radius: 10px;

  font-size: 15vmin;

  width: 41.64%;
  height: 20.08%;
  top: 23.61%;
  opacity: 0;
  box-sizing: border-box;

  animation: ${zoomIn} 1s linear forwards, ${shadowGrow} 1.5s infinite none;
  animation-delay: 1s, 2.5s;
`;

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

  margin: auto;

  animation: ${zoomIn} 1s linear 2s forwards;
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

    animation: ${BtnMotion} 1s linear infinite;

    background-position: center;
    background-size: 100%, 100%;
    background-repeat: no-repeat;

    cursor: pointer;
    /* &:hover {
      transform: rotate(20deg) translateY(-10px);
      transition: 1s linear;
      z-index: 1;
      width: 19.16vw;
      height: 8.13vw;
    } */

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
    }
  }
`;

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
