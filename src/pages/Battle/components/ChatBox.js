import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ChatBox = (props) => {
    const inputRef = useRef();

    //채널 정보
    const roomId = props.roomId;
    const username = props.username;

    //메세지 보내기
    const [message, setMessage] = React.useState("");

    //채팅 기록
    const chattinglist = useSelector((state) => state.chatlist.list);

    //Websocket
    const clientChat = props.clientChat

    const sendMessage = () => {
        inputRef.current.focus();
        clientChat.send(`/pub/chat/message${roomId}`, {}, JSON.stringify(
            {
                type: "TALK",
                roomId: { roomId },
                sender: { username },
                message: message,
            })
        );
        setMessage("");
    }

    // 엔터키 입력 시
    const onKeyPress = (e) => {
        if (e.key == "Enter") {
            sendMessage();
        }
    }

    return (
        <ChatBoxDiv>
            <ChattingDiv>
                {chattinglist.map((list, idx) => {
                    return (
                        <SingleMes key={idx}>
                            <SingleMesInfo>
                                {list.type === "TALK" ? (
                                    <div>{list.sender}&nbsp;:&nbsp;{list.message}</div>
                                ) : (
                                    <div>{list.message}</div>
                                )}
                            </SingleMesInfo>
                        </SingleMes>
                    )
                })
                }
            </ChattingDiv>
            <ChatInputDiv>
                <ChatInput
                    value={message}
                    onKeyPress={onKeyPress}
                    onChange={(e) => { setMessage(e.target.value); }}
                    placeholder="메세지 보내기"
                    ref={inputRef}
                />
                <ChatSend
                    onClick={sendMessage}
                />
            </ChatInputDiv>
        </ChatBoxDiv>
    )
}
const ChatBoxDiv = styled.div`
width: 98.5%;
height: 80%;
margin: 0;
background-color: #111823;
border-right: 6px solid #A0935C;
border-left: 6px solid #FFFAE3;
border-bottom: 6px solid #A0935C;
`;

const ChattingDiv = styled.div`
display: flex;
overflow-y: auto;
overflow-x: hidden;
flex-direction: column-reverse;
width: 100%;
height: 76%;
margin:0;
`;

const SingleMes = styled.div`
display: flex;
flex-direction: row;
width: 80%;
border-radius: 5px;
align-items: center;
padding: 5px;
&:hover{
    background-color: grey;
}
`;

const SingleMesInfo = styled.div`
display: flex;
margin-left: 10px;
text-align: left;
color: white;
`;

const ChatInputDiv = styled.div`
   display: flex;
   align-items: center;
   width: 99%;
   height: 20%;
   margin: 0;
   padding: 0;
   background-color: white;
   border: 3px solid black;
`;
const ChatInput = styled.input`
width: 80%;
height: calc((2vh + 2vw)/2);
font-size: calc((2vh + 2vw)/3);
margin-right: 25px;
margin-left: 11px;
border : none;
`;

const ChatSend = styled.div`
   width: 15%;
   height: 85%;
   background-image: url(/img/sendBtn.svg);
   background-repeat: no-repeat;
   background-size: contain;
   background-position: center;
`
export default ChatBox