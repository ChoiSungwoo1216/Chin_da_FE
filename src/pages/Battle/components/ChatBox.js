import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// import { LoadChatAxios, addchatlist } from "../redux/modules/chatlist";
import { addchatlist } from "../../../redux/modules/chatlist"

import * as StompJS from "stompjs";
import * as SockJS from "sockjs-client";

const ChatBox = (props) => {
    const dispatch = useDispatch();

    //채널 정보
    const roomId = props.roomId;
    const username = props.username;
    const Authorization = sessionStorage.getItem("Authorization")
    const headers = { "Authorization": Authorization };
    const ChatApi = "http://13.209.42.37:8080"

    let socket = new SockJS(`${ChatApi}/ws-stomp?username=` + encodeURI(username));
    let clientChat = StompJS.over(socket);

    //메세지 보내기
    const [message, setMessage] = React.useState("");

    //채팅 기록
    const chattinglist = useSelector((state) => state.chatlist.list);

    //socket

    React.useEffect(() => {
        if (roomId !== undefined) {
            connect();
            return () => { clientChat.disconnect() };
        }
    }, [roomId])

    const connect = () => {
        clientChat.connect(headers, onConnect, onError);
    };

    const onConnect = () => {
        clientChat.subscribe(`/sub/chat/room/${roomId}`, ReceiveFunc);
    };

    const ReceiveFunc = (message) => {
        if (message.body) {
            const mes = JSON.parse(message.body);
            console.log(mes);
        } else {
            alert("error");
        }
    }
    
    const onError = (err) => {
        console.log(err);
    }

    const sendMessage = () => {
        clientChat.send(`/room/enter/${roomId}`, {}, JSON.stringify(
            {
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
                                <div>{list.nickname}&nbsp;:&nbsp;{list.message}</div>
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

const ChatImg = styled.img`
width: 36px;
height: 36px;
border-radius: 5px;
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