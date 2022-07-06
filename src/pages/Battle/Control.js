import React from "react"
import styled from "styled-components"
const Control = (props) => {
    const { setRunTimer, setShowModal } = props
    return (
        <ControlDiv>
            <div>타이머 시작
                <button onClick={() => setRunTimer(true)}>시작</button>
                <button onClick={() => setRunTimer(false)}>끝</button>
            </div>
            <div>모달창 오픈
                <button onClick={() => setShowModal(true)}>열기</button>
                <button onClick={() => setShowModal(false)}>닫기</button>
            </div>
        </ControlDiv>
    )
}

export default Control

const ControlDiv = styled.div`
    width : 300px;
    height: 300px;
    background-color: white;
    opacity: 0.5;
    position: fixed;
    z-index: 30;
    bottom:0;
    left:0;
`;