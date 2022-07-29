import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ChatBox = ({roomId, username, clientChat}) => {

  //메세지 보내기
  const messageRef = useRef("");
  //채팅 기록
  const chattinglist = useSelector((state) => state.chatlist.list);

  const sendMessage = () => {
    clientChat.send(
      `/pub/chat/message`,
      {},
      JSON.stringify({
        type: "TALK",
        roomId: roomId,
        sender: username,
        message: messageRef.current.value,
      })
    );
    messageRef.current.value = "";
  };

  // 엔터키 입력 시
  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      sendMessage();
    }
  };

  return (
    <ChatBoxDiv>
      <ChattingDiv>
        {chattinglist.map((list, idx) => {
          return (
            <SingleMes key={idx}>
              <SingleMesInfo>
                {list.type === "TALK" ? (
                  <div>
                    {list.sender}&nbsp;:&nbsp;{list.message}
                  </div>
                ) : (
                  <div>{list.message}</div>
                )}
              </SingleMesInfo>
            </SingleMes>
          );
        })}
      </ChattingDiv>
      <ChatInputDiv>
        <ChatInput
          // value={message}
          type="text"
          onKeyPress={onKeyPress}
          onChange={(e) => {
            messageRef.current = e.target;
          }}
          placeholder="메세지 보내기"
          ref={messageRef}
        />
        <ChatSend onClick={sendMessage}>
          <p>보내기</p>
        </ChatSend>
      </ChatInputDiv>
    </ChatBoxDiv>
  );
};
const ChatBoxDiv = styled.div`
  width: calc(100% - 6px);
  height: 80%;
  max-height:25vh;
  margin-bottom: 2vh;
  border-radius: 5px;
  border-right: 6px solid #a0935c;
  border-left: 6px solid #fffae3;
  background-color: #111823;
`;

const ChattingDiv = styled.div`
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  flex-direction: column-reverse;
  width: 100%;
  height: 76%;
  margin: 0;
  
`;

const SingleMes = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-radius: 5px;
  align-items: center;
  margin: 0.2vh 0.4vw;
  
  padding: 5px;
  &:hover {
    background-color: grey;
  }
`;

const SingleMesInfo = styled.div`
  display: flex;
  text-align: left;
  color: white;
`;

const ChatInputDiv = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: calc(100% - 8px);
  height: 20%;
  margin: 0;
  padding: 0;
  background-color: #5777ce;
  border-bottom: 4px solid #c0cfff;
  border-left: 4px solid #c0cfff;
  border-right: 4px solid #c0cfff;
  border-top: 4px solid black;
`;
const ChatInput = styled.input`
  width: 85%;
  height: calc((2.2vh + 2.2vw) / 2);
  font-size: calc((2vh + 2vw) / 3);
  margin: 0.5vw;
  border-radius: 2px;
  border: none;
`;

const ChatSend = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc((16vh + 16vw) / 4);
  background-image: url(/img/sendBtn.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  padding-bottom: 1vh;
  margin: 0.5vh;
  & p {
    padding-top: 1.1vh;
    font-size: calc((3vh + 3vw) / 4);
    color: white;
  }
  &:hover {
    cursor: pointer;
  }
`;
export default ChatBox;
