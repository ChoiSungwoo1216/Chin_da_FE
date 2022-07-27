import React from "react"
import styled from "styled-components"
import { ReadyUser, UserSubmitPending } from "./ReadyAndPending.js";
import { AceEditorPlayer} from "./AceEditors.js";

const UserCompoDiv = ({ gameStart, sendReady, mode, codeRef, onSubmit, trySub}) => {
    return (
        <>
            {gameStart === false ? <ReadyUser sendReady={sendReady} /> : null}
            <UserSubmitPending />
            <AceEditorPlayer mode={mode} codeRef={codeRef}></AceEditorPlayer>
            <SubmitBtn onClick={() => onSubmit()}>
                제&nbsp;&nbsp;&nbsp;&nbsp;출&nbsp;&nbsp;{trySub}&nbsp;/&nbsp;3
            </SubmitBtn>
        </>
    )
}

export default UserCompoDiv

const SubmitBtn = styled.button`
  width: 100%;
  height: 7%;
  font-size: calc((5vh + 5vw) / 4);
  font-weight: 500;
  font-family: "Neo";
  background-color: #5777ce;
  opacity: 1;
  color: white;
  z-index: 4;
  border-top: 3px solid #c0cfff;
  border-left: 3px solid #c0cfff;
  border-right: 5px solid #a2b7ed;
  border-bottom: 4px solid #a2b7ed;
`;