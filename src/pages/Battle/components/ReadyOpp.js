import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { alreadyUser } from "../../../redux/modules/user";

const ReadyOpp = () => {
  const oppReady = useSelector((state) => state.user.already.opp);
  const dispatch = useDispatch();

  const setReady = () => {
    oppReady === false
      ? dispatch(alreadyUser({ opp: true }))
      : dispatch(alreadyUser({ opp: false }));
  };

  return (
    <ReadyContainer>
      <Div wait={oppReady}>
        <ReadyBtn onClick={setReady} />
      </Div>
    </ReadyContainer>
  );
};

export default ReadyOpp;

const ReadyContainer = styled.div`
  display: flex;
  position: absolute;
  width: 42.13vw;
  height: inherit;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 92%;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.wait === true &&
    css`
      background-color: rgba(0, 0, 255, 0.3);
      & div {
        background: url("/img/already.svg") center no-repeat;
        background-size: 100% 100%;
      }
    `}
  z-index: 5;
`;

const ReadyBtn = styled.div`
  display: flex;
  position: relative;
  width: 14.6025vw;
  height: 3.125vw;
  border: 1px solid black;
  background: url("/img/ready.svg") center no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  z-index: 1;
  border: none;
`;
