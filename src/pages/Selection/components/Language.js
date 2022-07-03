import React from "react";
import styled from "styled-components";


const Language = (props) => {
    const { setLanguage, setLanOn, setLevOn } = props

    const SelectLan = (e) => {
        setLanguage(e.target.value)
        setLanOn(false);
        setLevOn(true);
    }

    return (
       <>
         <Title>언어선택</Title>
          <Wrapper>
             <TypeBtnDiv value="0" onClick={(e) => SelectLan(e)}>
                <TypeBtn>
                   <img
                      style={{ width: '100%' }}
                      src="https://image.shutterstock.com/image-vector/pixel-art-black-bodyguard-character-260nw-1056562499.jpg"
                   />
                </TypeBtn>
                <InsideBtn>PYTHON3</InsideBtn>
             </TypeBtnDiv>

             <TypeBtnDiv value="1" onClick={(e) => SelectLan(e)}>
                <TypeBtn>
                   <img
                      style={{ width: '100%' }}
                      src="https://image.shutterstock.com/image-vector/pixel-art-black-bodyguard-character-260nw-1056562499.jpg"
                   />
                </TypeBtn>
                <InsideBtn>JAVA</InsideBtn>
             </TypeBtnDiv>

             <TypeBtnDiv value="2" onClick={(e) => SelectLan(e)}>
                <TypeBtn>
                   <img
                      style={{ width: '100%' }}
                      src="https://image.shutterstock.com/image-vector/pixel-art-black-bodyguard-character-260nw-1056562499.jpg"
                   />
                </TypeBtn>
                <InsideBtn>JAVASCRIPT</InsideBtn>
             </TypeBtnDiv>
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
   display: flexbox;
   justify-content: center;
   align-items: center;
   min-height: 100vh;
   margin: auto;
   position: relative;
`;

const TypeBtnDiv = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 250px;
   height: 350px;
   background-color: #ffffff1a;
   margin: auto 20px;
   padding: 1.5em;
   border-radius: 25px;
   border: 1px solid #0000001a;
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

const InsideBtn = styled.h2`
   color: #ffffff60;
   text-transform: uppercase;
   font-size: 30px;
`;
export default Language;