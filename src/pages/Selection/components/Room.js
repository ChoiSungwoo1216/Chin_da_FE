import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"

const Room = (props) => {
   const navigate = useNavigate();
   const {
      language,
      level,
      setLanOn,
      setLevOn,
      setRoomOn,
   } = props
   
   const SelLang = () => {
      setRoomOn(false);
      setLanOn(true);
   }
   const SelLev = () => {
      setRoomOn(false);
      setLevOn(true);
   }

   const CreateRoom = () => {
      navigate("/Battle", {state: {language, level}});
   }

   const EnterRoom = () => {
      navigate("/Main", {state: {language, level}});
   }

   const languageIs = (language) => {
      if (language === "0") {
         return ("PYTHON3");
      } else if (language === "1") {
         return ("JAVA");
      } else {
         return ("JAVASCRIPT")
      }
   }

   const levelIs = (level) => {
      if (level === "0") {
         return ("⭐");
      } else if (level === "1") {
         return ("⭐⭐");
      } else {
         return ("⭐⭐⭐")
      }
   }

   return (
      <>
         <Title>방 선택</Title>
         <Wrapper>
            <SelectedDiv onClick={SelLang}>
               <TypeBtn>
                  <img
                     style={{ width: '100%' }}
                     src="https://image.shutterstock.com/image-vector/pixel-art-black-bodyguard-character-260nw-1056562499.jpg"
                     alt="none"
                  />
               </TypeBtn>
               <InsideBtn>{languageIs(language)}</InsideBtn>
            </SelectedDiv>
            <SelectedDiv onClick={SelLev}>
               <InsideBtn1>{levelIs(level)}</InsideBtn1>
            </SelectedDiv>
            <RoomSelectDiv>
               <RoomSelect >
                  <InsideBtn2 onClick={CreateRoom}/>
                  <InsideBtn3 onClick={EnterRoom} />
               </RoomSelect>
            </RoomSelectDiv>
         </Wrapper>
      </>
   );
}
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

const SelectedDiv = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 22.03vw;
   height: 48.6vh;
   margin: auto 20px;
   padding: 1.5em;
   background-image: url(img/level_card.png);
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

const RoomSelectDiv = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 22.03vw;
   height: 48.6vh;
   margin: 20px;
   padding: 1.5em;
   text-align: center;   
   background-image: url(img/level_card.png);
   background-repeat: no-repeat;
   background-size: contain;
   background-position: center;
`;

const RoomSelect = styled.div`
   display: flex;
   flex-direction: column;
   gap: 4vh;
   justify-content: center;
   align-items: center;
   width: 30vw;
   height: 10vw;
   margin: 2vh;
   text-align: center;
   animation: motion 0.3s linear 0s infinite alternate;
   -webkit-animation: motion 0.3s linear 0s infinite alternate;
   animation-delay: 0.3s;
`;

const InsideBtn = styled.div`
   color: #fff;
   text-transform: uppercase;
   font-size: 30px;
   animation: motion 0.3s linear 0s infinite alternate;
   -webkit-animation: motion 0.3s linear 0s infinite alternate;
   animation-delay: 0.1s;
`;

const InsideBtn1 = styled.div`
   color: #fff;
   text-transform: uppercase;
   font-size: 30px;
   margin-top: 0;
   animation: motion 0.3s linear 0s infinite alternate;
   -webkit-animation: motion 0.3s linear 0s infinite alternate;
   animation-delay: 0.3s;
`;
const InsideBtn2 = styled.div`
   width: 19vw;
   height: 5.7vw;
   background-image: url(img/create_room_btn.png);
   background-repeat: no-repeat;
   background-size: contain;
   background-position: center;
`;

const InsideBtn3 = styled.div`
   width: 19vw;
   height: 5.7vw;
   background-image: url(img/entrance_room_btn.png);
   background-repeat: no-repeat;
   background-size: contain;
   background-position: center;
`;
export default Room;