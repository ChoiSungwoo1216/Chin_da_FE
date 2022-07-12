import React from "react";
import styled, {css} from "styled-components";

const Level = (props) => {
  const { setLevel, setLanOn, setLevOn, setRoomOn, es } = props;
  const language = props.language
  const BackToLang = () => {
    setLevOn(false);
    setLanOn(true);
  };

  const SelectLev = (e) => {
    setLevel(e.target.id);
    setLevOn(false);
    setRoomOn(true);
    es.play();
  };

  console.log(language)

  return (
    <>
      <Title>난이도 선택</Title>
      <Wrapper>
        <SelectedDiv onClick={BackToLang}>
          <TypeBtn language={language} />
        </SelectedDiv>
        <LevelBtn id="0" onClick={(e) => {SelectLev(e);}}>
          <InsideBtnO id="0" onClick={(e) => {SelectLev(e);}}/>
        </LevelBtn>
        <LevelBtn id="1" onClick={(e) => {SelectLev(e)}}>
          <InsideBtnTw id="1" onClick={(e) => {SelectLev(e)}} />
        </LevelBtn>
        <LevelBtn id="2" onClick={(e) => { SelectLev(e) }}>
          <InsideBtnTh id="2" onClick={(e) => { SelectLev(e) }}/>
        </LevelBtn>
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

const SelectedDiv = styled.div`
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
  &:hover{
    transition: 0.5s;
    opacity: 0.75;
  }
`;

const TypeBtn = styled.div`
  display: flex;
  flex-direction: column;
  ${(props) => {
    if (props.language === "0") {
      return css`
        background-image: url("/img/python3.svg");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      `;
    } else if (props.language === "1"){
      return css`
        background-image: url("/img/java.svg");
        background-position: cover;
        background-repeat: no-repeat;
        background-position: center;
        `;
    }else if (props.language === "2"){
      return css`
        background-image: url("/img/js.svg");
        background-position: cover;
        background-repeat: no-repeat;
        background-position: center;
        `;
    }
  }}
  width: 100%;
  height: 80%;
  overflow: hidden;
  object-fit: cover;
`;

const LevelBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 22.03vw;
  height: 48.6vh;
  margin: 20px;
  padding: 1.5em;
  background-image: url(/img/selectBox.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  text-align: center;
  opacity: 0.5;
  &:hover{
    opacity: 1;
    transition: 0.5s;
    transform: scale(1.05);
  }
`;

const InsideBtn1 = styled.div`
  color: #fff;
  text-transform: uppercase;
  font-size: calc((3vh + 3vw)/2);
`;

const InsideBtnO = styled.div`
  animation: motion 0.3s linear 0s infinite alternate;
  margin-top: 0;
  -webkit-animation: motion 0.3s linear 0s infinite alternate;
  animation-delay: 0.3s;
  width: 60%;
  height: 60%;
  background-image: url("/img/starOne.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const InsideBtnTw = styled.div`
  animation: motion 0.3s linear 0s infinite alternate;
  margin-top: 0;
  -webkit-animation: motion 0.3s linear 0s infinite alternate;
  animation-delay: 0.4s;
  width: 80%;
  height: 80%;
  background-image: url("/img/starTwo.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
const InsideBtnTh = styled.div`
  animation: motion 0.3s linear 0s infinite alternate;
  margin-top: 0;
  -webkit-animation: motion 0.3s linear 0s infinite alternate;
  animation-delay: 0.5s;
  width: 100%;
  height: 100%;
  background-image: url("/img/starThree.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Level;
