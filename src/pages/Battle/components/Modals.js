import React from "react";
import styled, { keyframes } from "styled-components";
import Modal from "react-modal";
import JSConfetti from "js-confetti";
import ConfettiCanvas from "react-confetti-canvas";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Modals.css";
import effectSound from "../../../shared/effectSound";
import winSound from "../../../audios/WinSE1.mp3";
import loseSound from "../../../audios/LoseSE1.mp3";
import win1Sound from "../../../audios/WinSE2.mp3";
import lose1Sound from "../../../audios/FailSE1.mp3";

/*QuestionModal*/
export const QuestionModal = (p) => {
  const setClose = p.setValue;
  const question = p.question;
  const questionTitle = p.questionTitle;
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const customModalStyles = {
    overlay: {
      background: "#0000006a",
    },
    // content: {
    //    width: '60%',
    //    height: '70%',
    //    margin: 'auto',
    //    background: '#0C1119',
    //    borderRadius: '5px',
    //    position: 'relative',
    //    padding: '15px',
    //    marginTop: '100px'
    // },
  };

  const allClose = () => {
    setClose(false);
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        className="ModalBox"
        isOpen={modalIsOpen}
        style={customModalStyles}
      >
        <div className="ModalBody">
          <header>
            <h3>Question</h3>
          </header>
          <div className="ModalContent">
            <div className="qTitle">{questionTitle}</div>
            <div className="q">{question}</div>
          </div>
        </div>
        <img
          className="ExitBtn quest"
          src="/img/X_btn_black_30.svg"
          onClick={() => allClose()}
          alt=""
        />
      </Modal>
    </>
  );
};

export const GameRuleModal = (p) => {
  const setClose = p.setClose;
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const customModalStyles = {
    overlay: {
      background: "#0000006a",
    },
  };

  const allClose = () => {
    setClose(false);
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        className="ModalBox ruleBox"
        isOpen={modalIsOpen}
        style={customModalStyles}
      >
        <div className="ModalBody">
          <header>
            <h3>G A M E R U L E</h3>
          </header>
          <div className="ModalContent ruleContent">
            <div className="qTitle">??? ???</div>
            <hr />
            <div className="q">
              <ol>
                <li>
                  ?????? ??? ??????????????? ???????????? ???,
                  <br />
                  ????????? ????????????, ??????????????? ?????????.
                </li>
                <hr />
                <li>????????? ????????? ????????? ??? 3????????????.</li>
                <hr />
                <li>????????? ????????? ???????????? ?????? ??????????????? ?????????.</li>
                <hr />
                <li>
                  ?????? ?????? ???, ????????? ????????? ????????? ???????????? ????????????
                  ???????????????. (??????????????? ??? ??? ????????????.)
                </li>
                <hr />
                <li>
                  ???????????? ???????????? ???????????????
                  <br />
                  <br />
                  Python : print()
                  <br />
                  java : System.out.println
                  <br />
                  javascript : console.log()
                </li>
                <hr />
              </ol>
            </div>
          </div>
        </div>
        <img
          className="ExitBtn quest"
          src="/img/X_btn_black_30.svg"
          onClick={() => allClose()}
          alt=""
        />
      </Modal>
    </>
  );
};

/*SuccessModal*/
export const SuccessModal = ({
  setROpen,
  setResult,
  setRunTimer,
  setBbmute,
}) => {
  const userSound = useSelector((state) => state.user.sound);
  const winEs = effectSound(winSound, userSound.es);
  const muteBb = () => {
    setBbmute(true);
    setRunTimer(false);
  };
  React.useEffect(() => {
    winEs.play();
    muteBb();
  }, []);
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const customModalStyles = {
    overlay: {
      background: "#0000009a",
    },
    content: {
      background: "transparent",
      border: "transparent",
      borderRadius: "5px",
      overflow: "hidden",
    },
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
          setROpen(true);
          setResult("WIN");
        }}
        style={customModalStyles}
      >
        <img
          className="ExitBtn"
          src="/img/X_btn_black_30.svg"
          onClick={() => {
            setIsOpen(false);
            setROpen(true);
            setResult("WIN");
          }}
          alt=""
        />
        <div className="ConfettiTxt">
          <img src="/img/W.svg" alt="" />
          <img src="/img/I.svg" alt="" />
          <img src="/img/N.svg" alt="" />
        </div>
        <ConfettiCanvas ribbonParticleMass={1} />
        <ConfettiCanvas ribbonParticleDrag={0.05} />
      </Modal>
    </>
  );
};

/*FailModal*/
export const FailModal = ({ setROpen, setResult, setRunTimer, setBbmute }) => {
  const userSound = useSelector((state) => state.user.sound);
  const loseEs = effectSound(loseSound, userSound.es);
  const muteBb = () => {
    setBbmute(true);
    setRunTimer(false);
  };
  React.useEffect(() => {
    loseEs.play();
    muteBb();
  }, []);
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const confetti = new JSConfetti();
  const confettiList = () => {
    const customModalStyles = {
      content: {
        color: "#fff",
      },
    };
    confetti.addConfetti({
      emojiSize: 30,
      emojis: ["Lose"],
      // confettiColor: '#fff',
    });
    confetti.addConfetti({
      emojis: ["????", "????"],
      emojiSize: 50,
      confettiNumber: 30,
    });
  };

  React.useEffect(() => {
    confettiList();
  }, []);

  const customModalStyles = {
    overlay: {
      background: "#0000009a",
    },
    content: {
      background: "transparent",
      border: "transparent",
      borderRadius: "5px",
      overflow: "hidden",
      color: "#fff",
    },
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
          setROpen(true);
        }}
        style={customModalStyles}
      >
        <img
          className="ExitBtn"
          src="/img/X_btn_black_30.svg"
          onClick={() => {
            setIsOpen(false);
            setROpen(true);
            setResult("LOSE");
          }}
          alt=""
        />
        <div className="ConfettiTxt">
          <img src="/img/L.svg" alt="" />
          <img src="/img/O.svg" alt="" />
          <img src="/img/S.svg" alt="" />
          <img src="/img/E.svg" alt="" />
        </div>
      </Modal>
    </>
  );
};

/*Result Modal*/
export const Result = (props) => {
  const userSound = useSelector((state) => state.user.sound);
  const winEs = effectSound(win1Sound, userSound.es);
  const loseEs = effectSound(lose1Sound, userSound.es);
  const { setROpen, setMbmute, setGameStart, setTrySub } = props;
  const result = props.result;
  React.useEffect(() => {
    if (result === "WIN") {
      winEs.play();
    } else {
      loseEs.play();
    }
  }, []);
  const navigate = useNavigate();
  const player = sessionStorage.getItem("username");
  const GoBackMain = () => {
    setMbmute(false);
    navigate("/Selection");
  };
  return (
    <>
      <ResultBackground />
      <ResultDiv>
        <SettingWord>RESULT</SettingWord>
        <BlackDiv>
          <ResultEle>{player} ??????</ResultEle>
          {result === "WIN" ? (
            <ResultLetterDiv>
              <LetterNoAni src={"/img/W.svg"} alt="" />
              <LetterAni src={"/img/I.svg"} alt="" />
              <LetterNoAni src={"/img/N.svg"} alt="" />
            </ResultLetterDiv>
          ) : (
            <ResultLetterDiv>
              <LetterNoAni src={"/img/L.svg"} alt="" />
              <LetterNoAni src={"/img/O.svg"} alt="" />
              <LetterNoAni src={"/img/S.svg"} alt="" />
              <LetterSlopeAni src={"/img/E.svg"} alt="" />
            </ResultLetterDiv>
          )}
          <ResultElement>?????? ??? ???????????????????</ResultElement>
          <ReDiv>
            <ResultBtn
              onClick={() => {
                setROpen(false);
                setMbmute(false);
                setGameStart(false);
                setTrySub(3);
              }}
            >
              Yes
            </ResultBtn>
            <ResultBtn onClick={GoBackMain}>No</ResultBtn>
          </ReDiv>
        </BlackDiv>
      </ResultDiv>
    </>
  );
};

const ResultBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  z-index: 12;
`;
const SettingWord = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc((2vw + 2vh) / 2);
  z-index: 12;
  color: white;
  font-weight: 600;
  width: calc(100% - 5px);
  height: 10%;
  background-color: #5777ce;
  border-top: 2px solid #c0cfff;
  border-left: 2px solid #c0cfff;
  border-right: 2px solid #c0cfff;
  border-bottom: 5px solid black;
`;

const ResultDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
  width: 30vw;
  height: 58vh;
  border: 5px solid black;
  color: white;
`;

const BlackDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 5%;
  width: calc(100% - 5px);
  height: 100%;
  border-left: 2px solid #fffae3;
  border-right: 2px solid #c1b78e;
  border-bottom: 2px solid #a0935c;
  background-color: #0c1119;
`;

const ResultEle = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  line-height: 7vh;
  font-size: calc((3vw + 3vh) / 2);
  font-weight: 600;
  text-align: center;
`;

const ResultLetterDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10%;
  justify-content: center;
`;

const ReDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5%;
  width: 100%;
  height: 10%;
`;

const ResultElement = styled.div`
  position: relative;
  width: 100%;
  font-size: calc((3vw + 3vh) / 2 - 10px);
  font-weight: 600;
  padding: 10px;
  text-align: center;
`;

const ResultBtn = styled.div`
  position: relative;
  width: 20%;
  font-size: calc((3vw + 3vh) / 2 - 10px);
  font-weight: 600;
  text-align: center;
  padding: 10px;
  :hover {
    background-color: white;
    color: #0c1119;
    border: 2px solid #a0935c;
    border-radius: 5px;
    width: calc(20% - 4px);
  }
`;

const LetterNoAni = styled.img`
  width: calc((5vw + 5vh) / 2);
  height: calc((5vw + 5vh) / 2);
`;

const LetterRotate = keyframes`
0%{
    transform: translateY(0) rotate(0);
}
30%{
    transform: translateY(-20px) rotate(0);
}
40%{
    transform: translateY(-20px) rotate(180deg);
}
50%{
    transform: translateY(-20px) rotate(360deg);
}
80%{
    transform: translateY(0) rotate(360deg);
}
100%{
    transform: translateY(0) rotate(360deg);
}
`;

const LetterAni = styled.img`
  width: calc((5vw + 5vh) / 2);
  height: calc((5vw + 5vh) / 2);
  animation: ${LetterRotate} 2s linear infinite;
`;

const LetterSlope = keyframes`
0%{
    transform-origin: bottom left;
    transform: translateY(5px) rotate(10deg);
}
40%{
    transform-origin: bottom left;
    transform: translateY(5px) rotate(20deg);
}
60%{
    transform-origin: bottom left;
    transform: translateY(5px) rotate(30deg);
}
80%{
    transform-origin: bottom left;
    transform: translateY(5px) rotate(20deg);
}
100%{
    transform-origin: bottom left;
    transform: translateY(5px) rotate(10deg);
}
`;

const LetterSlopeAni = styled.img`
  width: calc((5vw + 5vh) / 2);
  height: calc((5vw + 5vh) / 2);
  animation: ${LetterSlope} 2s linear infinite;
`;
