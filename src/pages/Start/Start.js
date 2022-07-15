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
      <LogoContainer>
        <StartLogo>
          <InDiv />
        </StartLogo>
        {/* <Shadow /> */}
      </LogoContainer>
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

const OPACTIY = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

const logoChange = keyframes`
  0%{
    background-image: url('/img/logo_blue.svg')
  }
  25%{
    background-image: url('/img/logo_red.svg')
  }
  50%{
    background-image: url('/img/logo_pink.svg')
  }
  75%{
    background-image: url('/img/logo_red.svg')
  }
  100%{
    background-image: url('/img/logo_blue.svg')
  }
`;

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

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  width: 23.6%; //35.16vw = 450px, 27.34vw = 350px, 19.53vw=250px, 23.44vw=300px 62:38
  height: 23.6vw;
  top: 22.06vh;
  border: 1px solid red;
  background-color: transparent;
`;
const StartLogo = styled.div`
  position: relative;
  display: flex;

  text-align: center;
  justify-content: center;
  flex-direction: column;

  background: url("/img/logo_badge.svg") center no-repeat;
  background-size: cover;

  /* font-size: 15vmin; */

  width: 100%; //35.16vw = 450px, 27.34vw = 350px, 19.53vw=250px, 23.44vw=300px 62:38
  height: 100%;

  opacity: 0;

  background-color: transparent;

  animation: ${zoomIn} 1s ease-in forwards;
  /* , ${logoChange} 3s linear 2s infinite; */

  padding: 0px;
  z-index: 12;
`;

const InDiv = styled.div`
  /* position: relative;
  display: flex;

  top: 6.25%;
  left: 12.5%;
  width: 75%;
  height: 75%;
  border-radius: 50%; */
  border: 1px solid red;
`;

const Shadow = styled.div`
  position: relative;
  display: flex;
  width: 19.53%;
  height: 19.53vw;

  top: 6.25%;
  left: 12.5%;
  /* left: 43vw;
  top: 32%; */
  border: 1px solid blue;

  background-color: transparent;
  border-radius: 50%;
  animation: ${shadowGrow} 1.5s infinite none;
  z-index: -1;
`;

const Title = styled.div`
  border: 1px solid blue;
`;

const Dust = styled.div`
  border: 1px solid red;
`;
const Fist = styled.div`
  border: 1px solid white;
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

  animation: ${OPACTIY} 1s linear 3s forwards;
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

    animation: ${BtnMotion} 1.5s linear 5s infinite,
      ${zoomIn} 1s linear forwards;

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
