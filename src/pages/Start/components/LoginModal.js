import React from "react";
import Login from "./Login";
import styled, { keyframes } from "styled-components";
const LoginModal = (props) => {
  const { open, close } = props;
  return (
    <>
      {open ? (
        <>
          <OpenModal>
            <ModalSection>
              <ModalHeader>
                <p>LOGIN</p>
                <Xbtn onClick={close}></Xbtn>
              </ModalHeader>
              <ModalBody>
                <Login />
              </ModalBody>
            </ModalSection>
          </OpenModal>
        </>
      ) : (
        <Modal />
      )}
    </>
  );
};
export default LoginModal;
const ModalShow = keyframes`
  from {
    opacity: 0;
    transform: translateY(-550px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const ModalBG = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const Modal = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;
const OpenModal = styled(Modal)`
  display: flex;
  align-items: center;
  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: ${ModalBG} 1s;
`;
const ModalSection = styled.div`
  display: flex;
  position: relative;
  background-color: transparent;
  width: 30vw;
  height: 20.98vw;
  left: 35%;
  animation: ${ModalShow} 0.3s;
  /* overflow: hidden; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 4;
  /* padding: 1vw; */
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 0.2vh;
  z-index: 5;
  width: 100%;
  height: 15.33%;
  font-weight: 700;
  font-size: calc((2.7vw + 2.7vh) / 2);
  letter-spacing: 0.5vw;
  background-image: url("/img/login_modal_header.svg");
  background-repeat: no-repeat;
  background-size: 100%, 100%;
  background-position: inherit;
  & p {
    color: white;
    padding-top: 10px;
  }
`;
const Xbtn = styled.div`
  position: absolute;
  display: flex;
  top: -0.59vw;
  right: -0.59vw;

  width: 2.34375vw;
  height: 2.34375vw;
  z-index: 5;
  cursor: pointer;
  background-image: url("/img/X_btn_black_30.svg");
  background-size: contain;
  background-position: cover;
  background-repeat: no-repeat;
  &:hover {
    background-image: url("/img/X_btn_white_30.svg");
  }
`;
const ModalBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 87%;
  margin: 0;
  z-index: 1;
  background-image: url("/img/login_modal_body_gray.svg");
  background-repeat: no-repeat;
  background-size: 100%, 100%;
  background-position: inherit;
`;
