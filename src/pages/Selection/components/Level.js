import React from "react";
import styled from "styled-components";

const Level = (props) => {
   const {
      language,
      setLevel,
      setLanOn,
      setLevOn,
      setRoomOn,
      es,
   } = props

   const BackToLang = () => {
      setLevOn(false);
      setLanOn(true);
   }

   const SelectLev = (e) => {
      setLevel(e.target.id);
      setLevOn(false);
      setRoomOn(true);
      es.play();
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

   return (
      <>
         <Title>난이도 선택</Title>

         <Wrapper>
            <SelectedDiv onClick={BackToLang}>
               <TypeBtn>
                  <img
                     style={{ width: '100%' }}
                     src="https://image.shutterstock.com/image-vector/pixel-art-black-bodyguard-character-260nw-1056562499.jpg"
                     alt="none"
                  />
               </TypeBtn>
               <InsideBtn1>{languageIs(language)}</InsideBtn1>
            </SelectedDiv>

            <LevelBtn
               id="2"
               onClick={(e) => {
                  SelectLev(e);
               }}
            >
               <InsideBtnO>⭐⭐⭐</InsideBtnO>
            </LevelBtn>
            <LevelBtn
               id="1"
               onClick={(e) => {
                  SelectLev(e);
               }}
            >
               <InsideBtnTw>⭐⭐</InsideBtnTw>
            </LevelBtn>
            <LevelBtn
               id="0"
               onClick={(e) => {
                  SelectLev(e);
               }}
            >
               <InsideBtnTh>⭐</InsideBtnTh>
            </LevelBtn>
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

const LevelBtn = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 22.03vw;
   height: 48.6vh;
   margin: 20px;
   padding: 1.5em;
   
   background-image: url(/img/level_card.png);
   background-repeat: no-repeat;
   background-size: contain;
   background-position: center;
   text-align: center;
`;

const InsideBtn1 = styled.div`
   color: #fff;
   text-transform: uppercase;
   font-size: 30px;
`;

const InsideBtnO = styled.div`
   color: #fff;
   text-transform: uppercase;
   font-size: 30px;
   animation: motion 0.3s linear 0s infinite alternate;
   margin-top: 0;
   -webkit-animation: motion 0.3s linear 0s infinite alternate;
   animation-delay: 0.3s;
`;

const InsideBtnTw = styled.div`
   color: #fff;
   text-transform: uppercase;
   font-size: 30px;
   animation: motion 0.3s linear 0s infinite alternate;
   margin-top: 0;
   -webkit-animation: motion 0.3s linear 0s infinite alternate;
   animation-delay: 0.4s;
`;
const InsideBtnTh = styled.div`
   color: #fff;
   text-transform: uppercase;
   font-size: 30px;
   animation: motion 0.3s linear 0s infinite alternate;
   margin-top: 0;
   -webkit-animation: motion 0.3s linear 0s infinite alternate;
   animation-delay: 0.5s;
`;


export default Level