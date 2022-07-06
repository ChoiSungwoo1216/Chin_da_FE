import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// import { LoadChatAxios, addchatlist } from "../redux/modules/chatlist";
import {addchatlist} from "../../../redux/modules/chatlist"
import { useParams } from "react-router-dom";

// import * as StompJS from "stompjs";
// import * as SockJS from "sockjs-client";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ChatBox = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const channelId = params.id;
    console.log(channelId)
    //채널 정보
    // const { openProfile } = props;
    // const { userInfo } = props;
    // const { channelInfo } = props;
    // const channelId = channelInfo.channelId
    // const headers = { "Authorization": localStorage.getItem('access_token') };
    //메세지 보내기
    const [message, setMessage] = React.useState("");
    //채팅 기록
    const chattinglist = useSelector((state) => state.chatlist.list);

    // React.useEffect(() => {
    //     if (channelId !== undefined) {
    //         connect();
    //         return () => { client.disconnect() };
    //     }
    // }, [channelId])

    const sendMessage=()=>{
        dispatch(addchatlist({iconUrl :"https://image.shutterstock.com/image-vector/pixel-art-black-bodyguard-character-260nw-1056562499.jpg",
        message: message, nickname:"연습3", }))
        setMessage("");
    }
    //socket

    // let sock = new SockJS("http://54.180.154.178/socket");
    // let client = StompJS.over(sock);

    // const connect = () => {
    //     client.connect(headers, onConnected, onError);
    // };

    // const onConnected = () => {
    //     client.subscribe(`/sub/channel/${channelId}`,
    //         function (message) {
    //             console.log(message.body)
    //             if (message.body) {
    //                 const new_Data = JSON.parse(message.body);
    //                 dispatch(addchatlist(new_Data));
    //             } else {
    //                 alert("got empty message");
    //             }
    //         }, headers
    //     );
    // };
    // const onError = (err) => {
    //     console.log(err);
    // }

    // const sendMessage = () => {
    //     client.send(`/pub/message/${channelId}`, headers, JSON.stringify({
    //         channelId: channelId,
    //         message: message,
    //     }));
    //     setMessage("");
    // }


    //엔터키 입력 시
    // const onKeyPress = (e) => {
    //     if (e.key == "Enter") {
    //         sendMessage();
    //     }
    // }

    return (
        <>
            <ChattingDiv>
                {chattinglist.map((list, idx) => {
                    return (
                        <SingleMes key={idx}>
                            <ChatImg src={list.iconUrl} alt="none" />
                            <SingleMesInfo>
                                <div style={{ fontWeight: "600" }}>{list.nickname}</div>
                                <div>{list.message}</div>
                            </SingleMesInfo>
                        </SingleMes>
                    )
                })
                }
            </ChattingDiv>
            <ChatInputDiv>
                <ChatInput
                value={message}
                // // onKeyPress={onKeyPress}
                onChange={(e) => { setMessage(e.target.value); }}
                placeholder="메세지 보내기"
                />
                <ChatSend
                onClick={sendMessage}
                >Send</ChatSend>
            </ChatInputDiv>
        </>
    )
}

const ChattingDiv = styled.div`
display: flex;
overflow-y: auto;
overflow-x: hidden;
flex-direction: column-reverse;
width: 100%;
height: 18vh;
padding: 10px;
margin:0;
`;

const SingleMes = styled.div`
display: flex;
flex-direction: row;
width: 80%;
border-radius: 5px;
align-items: center;
margin: 5px 0;
padding: 10px;
&:hover{
    background-color: #ececec;
}
`;

const ChatImg = styled.img`
width: 36px;
height: 36px;
border-radius: 5px;
`;

const SingleMesInfo = styled.div`
display: flex;
flex-direction: column;
margin-left: 10px;
text-align: left;
`;

const ChatInputDiv = styled.div`
   display: flex;
   align-items: center;
   width: 100%;
   height: 7vh;
`;
const ChatInput = styled.input`
width: 80%;
height: 5vh;
font-size: 16px;
margin-right: 25px;
margin-left: 11px;
`;

const ChatSend = styled.button`
   width: 4.6vw;
   height: 3.5vh;
   background-color: #2D6BC8;
`
export default ChatBox