import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { alreadyUser } from "../../../redux/modules/user";
const ReadyUser = () => {
  const userReady = useSelector((state) => state.user.already.user);
  const dispatch = useDispatch();

  const setReady = () => {
    userReady === false
      ? dispatch(alreadyUser({ user: true }))
      : dispatch(alreadyUser({ user: false }));
  };

  return (
    <ReadyContainer wait={userReady}>
      <ReadyBtn onClick={setReady} />
    </ReadyContainer>
  );
};

export default ReadyUser;

const ReadyContainer = styled.div`
  display: flex;
  position: absolute;
  width: 49.59vw;
  height: 83.63vh;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.wait === true &&
    css`
      background-color: rgba(0, 0, 0, 0.6);
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
  width: 14.0625vw;
  height: 3.125vw;
  border: 1px solid black;
  background: url("/img/ready.svg") center no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  z-index: 1;
  border: none;
`;
