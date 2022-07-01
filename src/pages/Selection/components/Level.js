import React from "react";
import styled from "styled-components";

const Level = (props) => {
    const {
        language,
        setLevel,
        setLanOn,
        setLevOn,
        setRoomOn,
    } = props

    const BackToLang = () => {
        setLevOn(false);
        setLanOn(true);
    }

    const SelectLev = (e) => {
        setLevOn(false);
        setRoomOn(true);
        setLevel(e.target.value);
    }

    const languageIs = (language) => {
        if (language === "0") {
            return ("PYTHON");
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
                <InsideBtn1>{languageIs(language)}</InsideBtn1>
             </SelectedDiv>

             <LevelBtn
                value="2"
                onClick={(e) => {
                   SelectLev(e);
                }}
             >
                <InsideBtn2>⭐⭐⭐</InsideBtn2>
             </LevelBtn>
             <LevelBtn
                value="1"
                onClick={(e) => {
                   SelectLev(e);
                }}
             >
                <InsideBtn2>⭐⭐</InsideBtn2>
             </LevelBtn>
             <LevelBtn
                value="0"
                onClick={(e) => {
                   SelectLev(e);
                }}
             >
                <InsideBtn2>⭐</InsideBtn2>
             </LevelBtn>
          </Wrapper>
       </>
    );


}

const Title = styled.div`
   width: 100%;
   text-align: center;
   font-size: 40px;
   margin-top: 30px;
`;

const Wrapper = styled.div`
   width: 90%;
   display: flexbox;
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
   width: 250px;
   height: 350px;
   background-color: #ffffff1a;
   margin: 20px;
   padding: 1.5em;
   border-radius: 25px;
   border: 1px solid #0000001a;
   text-align: center;
`;

const LevelBtn = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 250px;
   height: 350px;
   background-color: #ffffff1a;
   margin: 20px;
   padding: 1.5em;
   border-radius: 25px;
   border: 1px solid #0000001a;
   text-align: center;
`;

const InsideBtn1 = styled.div`
   color: #fff;
   text-transform: uppercase;
   font-size: 30px;
   animation: motion 0.3s linear 0s infinite alternate;
   margin-top: 0;
   -webkit-animation: motion 0.3s linear 0s infinite alternate;
`;

const InsideBtn2 = styled.div`
   color: #fff;
   text-transform: uppercase;
   font-size: 30px;
   animation: motion 0.3s linear 0s infinite alternate;
   margin-top: 0;
   -webkit-animation: motion 0.3s linear 0s infinite alternate;
`;


export default Level