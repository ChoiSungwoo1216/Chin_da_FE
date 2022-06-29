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
                <TypeBtn value="python" onClick={(e) => SelectLan(e)}>PYTHON</TypeBtn>
                <TypeBtn value="java" onClick={(e) => SelectLan(e)}>JAVA</TypeBtn>
                <TypeBtn value="javascript" onClick={(e) => SelectLan(e)}>JAVASCRIPT</TypeBtn>
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
word-wrap: break-word;
`;
export default Language