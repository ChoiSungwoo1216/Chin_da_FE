import React from "react";
import styled from "styled-components";

const Login = () => {
  const client_id = process.env.REACT_APP_GIT_CLIENT_ID;
  const redirect_uri = process.env.REACT_APP_GIT_REDIRECT_URI;
  const locateGit = `https:/github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`;
  return (
    <>
      <Wrap>
        <Text>너 개발자면서 github도</Text>
        <Text>없는건 아니겠지?</Text>
        <GithubBtn>
          <BtnA href={locateGit} git={locateGit}>
            <p> GithubLogin </p>
          </BtnA>
        </GithubBtn>
      </Wrap>
    </>

  );
};

export default Login;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.34vw;
`;

const Text = styled.p`
  position: relative;
  display: flex;
  flex-direction: row;
  font-size: 1.56vw;
  top: ${(props) => props.marginTop};
  justify-content: center;
  margin: 0;
`;

const GithubBtn = styled.div`
   cursor: pointer;
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
   margin: 0;

   background-image: url('/img/login_btn_white.svg');
   background-position: center;
   background-size: 100%, 100%, cover;
   background-repeat: no-repeat;

   width: 14.06vw;
   height: 3.91vw;

   font-size: 1.56vw;
   line-height: 1;
   @keyframes push {
      50% {
         transform: scale(0.98);
      }
      100% {
         transform: scale(1);
      }
   }
   &:hover {
      background-image: url('/img/login_btn_black.svg');
      cursor: pointer;
      animation-name: push;
      animation-duration: 0.5s;
      animation-timing-function: ease-in;
      animation-iteration-count: 1;
      & a {
         color: white;
      }
   }
`;

const BtnA = styled.a`
  text-decoration: none;
  color: black;
`;
