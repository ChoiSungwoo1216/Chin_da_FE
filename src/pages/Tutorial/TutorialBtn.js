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
            {tutoOpen ? (<Tutorial setTutoOpen={setTutoOpen}/>) : (null)}
            <TutoBtn onClick={open}>?</TutoBtn>
        </div>
    )
}

const TutoBtn = styled.div`
position: fixed;
right: 30px;
bottom: 20px;
color: white;
width: 20px;
height: 20px;
border: 2px solid white;
border-radius: 10px;
text-align: center;
line-height: 20px;
z-index: 10;
`;

export default TutorialBtn