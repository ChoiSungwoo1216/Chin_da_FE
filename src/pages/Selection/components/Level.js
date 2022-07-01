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

    const BacktoLang = () => {
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
            <Title>
                난이도 선택
            </Title>
            <Div>
                <SelectedDiv onClick={BacktoLang}>
                    <InsideBtn>
                        {languageIs(language)}
                    </InsideBtn>
                </SelectedDiv>
                <LevelBtn value="2" onClick={(e) => { SelectLev(e) }}>
                    <InsideBtn>
                        ⭐⭐⭐
                    </InsideBtn>
                </LevelBtn>
                <LevelBtn value="1" onClick={(e) => { SelectLev(e) }}>
                    <InsideBtn>
                        ⭐⭐
                    </InsideBtn>
                </LevelBtn>
                <LevelBtn value="0" onClick={(e) => { SelectLev(e) }}>
                    <InsideBtn>
                        ⭐
                    </InsideBtn>
                </LevelBtn>
            </Div>
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

const Div = styled.div`
width: 90%;
display: flex;
flex-direction: row;
align-items: center;
gap: 5%;
padding : 5%;
`;

const SelectedDiv = styled.div`
width: 25vw;
height: 60vh;
font-size: 50px;
word-wrap: break-word;
line-height: 60vh;
text-align: center;
background-color: #808080;
`
const LevelBtn = styled.button`
width: 25vw;
height: 60vh;
font-size: 50px;
word-wrap: break-word;
`;

const InsideBtn = styled.div`
animation: motion 0.3s linear 0s infinite alternate; margin-top: 0;
	-webkit-animation: motion 0.3s linear 0s infinite alternate; margin-top: 0;
`;

export default Level