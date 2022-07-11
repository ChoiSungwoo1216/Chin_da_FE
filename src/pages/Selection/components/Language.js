import React from "react";
import styled, { keyframes } from "styled-components";

const Language = (props) => {
  const { setLanguage, setLanOn, setLevOn, es } = props;

  const SelectLan = (e) => {
    setLanguage(e.target.id);
    setLanOn(false);
    setLevOn(true);
    es.play();
  };

  return (
    <>
      <Title>언어선택</Title>
      <Wrapper>
        <TypeBtnDiv id="0" onClick={(e) => SelectLan(e)}>
          <TypeBtn>
            <img
              style={{ width: "100%" }}
              src="https://image.shutterstock.com/image-vector/pixel-art-black-bodyguard-character-260nw-1056562499.jpg"
              alt="none"
            />
          </TypeBtn>
          <InsideBtn>PYTHON3</InsideBtn>
        </TypeBtnDiv>

        <TypeBtnDiv id="1" onClick={(e) => SelectLan(e)}>
          <TypeBtnO>
            <img
              style={{ width: "100%" }}
              src="https://image.shutterstock.com/image-vector/pixel-art-black-bodyguard-character-260nw-1056562499.jpg"
              alt="none"
            />
          </TypeBtnO>
          <InsideBtn>JAVA</InsideBtn>
        </TypeBtnDiv>

        <TypeBtnDiv id="2" onClick={(e) => SelectLan(e)}>
          <TypeBtnT>
            <img
              style={{ width: "100%" }}
              src="https://image.shutterstock.com/image-vector/pixel-art-black-bodyguard-character-260nw-1056562499.jpg"
              alt="none"
            />
          </TypeBtnT>
          <InsideBtn>JAVASCRIPT</InsideBtn>
        </TypeBtnDiv>
      </Wrapper>
    </>
  );
};

const Title = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 50px;
  position: absolute;
  z-index: 1;
  color: #fff;
  font-size: 40px;
`;

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: auto;
  position: relative;
`;

const TypeBtnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 22.03vw;
  height: 48.6vh;
  margin: auto 20px;
  padding: 1.5em;
  background-image: url(/img/level_card.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const TypeBtn = styled.div`
  display: flex;
  flex-direction: column;
  width: 90px;
  height: 90px;
  overflow: hidden;
  object-fit: cover;
  margin: 50px 0;
  animation: motion 0.3s linear 0s infinite alternate;
  -webkit-animation: motion 0.3s linear 0s infinite alternate;
  animation-delay: 0.2s;
`;

const TypeBtnO = styled.div`
  display: flex;
  flex-direction: column;
  width: 90px;
  height: 90px;
  overflow: hidden;
  object-fit: cover;
  margin: 50px 0;
  animation: motion 0.3s linear 0s infinite alternate;
  -webkit-animation: motion 0.3s linear 0s infinite alternate;
  animation-delay: 0.3s;
`;

const TypeBtnT = styled.div`
  display: flex;
  flex-direction: column;
  width: 90px;
  height: 90px;
  overflow: hidden;
  object-fit: cover;
  margin: 50px 0;
  animation: motion 0.3s linear 0s infinite alternate;
  -webkit-animation: motion 0.3s linear 0s infinite alternate;
  animation-delay: 0.4s;
`;

const InsideBtn = styled.h2`
  color: #ffffff60;
  text-transform: uppercase;
  font-size: 30px;
`;
export default Language;
