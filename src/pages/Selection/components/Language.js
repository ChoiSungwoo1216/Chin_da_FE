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
            <Title>
                언어선택
            </Title>
            <TypeBtnDiv>
                <TypeBtn value="0" onClick={(e) => SelectLan(e)}><InsideBtn>PYTHON</InsideBtn></TypeBtn>
                <TypeBtn value="1" onClick={(e) => SelectLan(e)}><InsideBtn>JAVA</InsideBtn></TypeBtn>
                <TypeBtn value="2" onClick={(e) => SelectLan(e)}><InsideBtn>JAVASCRIPT</InsideBtn></TypeBtn>
            </TypeBtnDiv>
        </>
    )
}

const Title = styled.div`
width: 100%;
height: 128px;
text-align: center;
line-height: 128px;
font-size: 40px;
`;

const TypeBtnDiv = styled.div`
width: 90%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-evenly;
padding : 5%;
`;

const TypeBtn = styled.button`
width: 25vw;
height: 60vh;
font-size: 50px;
background-color: #808080;
word-wrap: break-word;
`;

const InsideBtn = styled.div`
animation: motion 0.3s linear 0s infinite alternate; margin-top: 0;
	-webkit-animation: motion 0.3s linear 0s infinite alternate; margin-top: 0;
`;
export default Language