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
          <InsideBtn id="0" onClick={(e) => SelectLan(e)} >PYTHON3</InsideBtn>
          <TypeBtn id="0" onClick={(e) => SelectLan(e)}/>
        </TypeBtnDiv>
        <TypeBtnDiv id="1" onClick={(e) => SelectLan(e)}>
          <InsideBtn id="1" onClick={(e) => SelectLan(e)}>JAVA</InsideBtn>
          <TypeBtnO id="1" onClick={(e) => SelectLan(e)}/>
        </TypeBtnDiv>
        <TypeBtnDiv id="2" onClick={(e) => SelectLan(e)}>
          <InsideBtn id="2" onClick={(e) => SelectLan(e)}>JAVASCRIPT</InsideBtn>
          <TypeBtnT id="2" onClick={(e) => SelectLan(e)}/>
        </TypeBtnDiv>
      </Wrapper>
    </>
  );
};

const Title = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 7vh;
  position: absolute;
  z-index: 1;
  color: #fff;
  font-size: calc((7vh+7vw));
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
  background-image: url(/img/selectBox.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  opacity: 0.5;
  &:hover{
    opacity: 1;
    transition: 0.5s;
    transform: scale(1.05);
  }
`;

const TypeBtn = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 50%;
  overflow: hidden;
  object-fit: cover;
  margin: 50px 0;
  animation: motion 0.3s linear 0s infinite alternate;
  -webkit-animation: motion 0.3s linear 0s infinite alternate;
  animation-delay: 0.2s;
  background-image: url(/img/python3.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const TypeBtnO = styled.div`
  display: flex;
  flex-direction: column;  
  width: 50%;
  height: 50%;
  overflow: hidden;
  object-fit: cover;
  margin: 50px 0;
  animation: motion 0.3s linear 0s infinite alternate;
  -webkit-animation: motion 0.3s linear 0s infinite alternate;
  animation-delay: 0.3s;
  background-image: url(/img/java.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const TypeBtnT = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 50%;
  overflow: hidden;
  object-fit: cover;
  margin: 50px 0;
  animation: motion 0.3s linear 0s infinite alternate;
  -webkit-animation: motion 0.3s linear 0s infinite alternate;
  animation-delay: 0.4s;
  background-image: url(/img/js.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const InsideBtn = styled.h2`
  color: white;
  text-transform: uppercase;
  font-size: calc((3vh + 3vw)/2);
`;
export default Language;
