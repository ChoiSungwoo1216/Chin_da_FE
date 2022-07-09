import React from "react"
import styled from "styled-components"
import Tutorial from "./Tutorial"

const TutorialBtn = () => {
    const [tutoOpen, setTutoOpen] = React.useState(false);
    const open = () => {
        setTutoOpen(true);
    }
    return (
        <div>
            {tutoOpen ? (<Tutorial setTutoOpen={setTutoOpen}/>) : (
            <TutoBtn src="img/question_btn_black.png" onClick={open}/>
            )}
        </div>
    )
}

const TutoBtn = styled.img`
position: fixed;
right: 30px;
bottom: 20px;
width: 30px;
height: 30px;
z-index: 10;
:hover{
    content: url(/img/question_btn_white.png);
}
`;

export default TutorialBtn