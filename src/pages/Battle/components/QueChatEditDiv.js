import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import ChatBox from "./ChatBox.js";
import { ReadyOpp, OppSubmitPending } from "./ReadyAndPending.js";
import { AceEditorOpp } from "./AceEditors.js";

const QueChatEditDiv = ({ que, roomId, username, gameStart, mode, opCode }) => {
  const modal = useSelector((state) => state.battleFunction.modalOpen);

  return (
    <>
      <QueDiv queOpen={modal.que} chatOpen={modal.chat}>
        <QueHead>
          <p>Question</p>
        </QueHead>
        <QueBox>
          <p>{que.questionTitle}</p>
          <div>{que.question}</div>
        </QueBox>
      </QueDiv>
      <ChatingDiv chatOpen={modal.chat}>
        <ChatHead>
          <p>Chatting</p>
        </ChatHead>
        <ChatBox roomId={roomId} username={username} />
      </ChatingDiv>
      <CodeDiv queOpen={modal.que} chatOpen={modal.chat}>
        {gameStart === false ? <ReadyOpp /> : null}
        <OppSubmitPending />
        <AceEditorOpp mode={mode} opCode={opCode} />
      </CodeDiv>
    </>
  );
};

export default QueChatEditDiv;

const QueDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${(props) => {
    if (props.queOpen && !props.chatOpen) {
      return css`
        height: 60%;
      `;
    } else if (props.queOpen && props.chatOpen) {
      return css`
        height: 36%;
      `;
    } else {
      return css`
        display: none;
      `;
    }
  }}
  margin-top: 0.5vh;
  margin-bottom: 1vh;
  border-radius: 5px;
  border-right: 6px solid #a0935c;
  border-left: 6px solid #fffae3;
  border-bottom: 6px solid #a0935c;
  background-color: #111823;
`;

const QueHead = styled.div`
  display: flex;
  align-items: center;
  width: 100.4%;
  height: 4vh;
  margin-top: -0.2vh;
  background-color: #5777ce;
  border-top: 4px solid #c0cfff;
  border-left: 4px solid #c0cfff;
  border-right: 4px solid #c0cfff;
  border-bottom: 4px solid black;
  border-radius: 5px;
  p {
    padding-left: 5px;
    color: white;
    font-size: calc(((2.2vh + 2.2vw) / 2.5));
  }
`;
const QueBox = styled.div`
  width: 98%;
  height: 90%;

  margin-left: 0.3vw;
  padding: 5px;
  color: lightgray;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #fff;
    border: 0.3px solid #fff;
    border-radius: 5vw;
  }
  &::-webkit-scrollbar-track {
    background-color: #0000003a;
  }
  p {
    margin-top: -0.5vh;
    color: lightgray;
    line-height: 1.5;
    font-size: calc((2vw + 2vh) / 3);
  }
  div {
    height: 90%;
    padding: -1vh 0;
    color: lightgray;
    line-height: 1.5;
    font-size: calc((2vw + 2vh) / 3);
  }
`;

const ChatingDiv = styled.div`
  width: 100%;
  height: 36%;
  ${(props) => {
    if (props.chatOpen === false) {
      return css`
        display: none;
      `;
    }
  }}
`;

const ChatHead = styled.div`
  display: flex;
  align-items: center;
  width: 100.4%;
  height: 4vh;
  background-color: #5777ce;
  border-top: 4px solid #c0cfff;
  border-left: 4px solid #c0cfff;
  border-right: 4px solid #c0cfff;
  border-bottom: 4px solid black;
  border-radius: 5px;
  p {
    padding-left: 5px;
    color: white;
    font-size: calc(((2.2vh + 2.2vw) / 2.5));
  }
`;

const CodeDiv = styled.div`
  width: 99.6%;

  ${(props) => {
    if (props.queOpen && !props.chatOpen) {
      return css`
        height: 35.5%;
      `;
    } else if (props.queOpen && props.chatOpen) {
      return css`
        height: 19.5%;
      `;
    } else if (!props.queOpen && props.chatOpen) {
      return css`
        height: 60%;
      `;
    } else {
      return css`
        height: 99%;
      `;
    }
  }}
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 5px 5px;
  border-top: 7px solid #fffae3;
  border-left: 7px solid #fffae3;
  border-right: 7px solid #c1b78e;
  border-bottom: 7px solid #a0935c;
`;
