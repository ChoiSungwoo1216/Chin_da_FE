import React from "react";
import styled from "styled-components";

const Login = () => {
  const GitKey = "44af62885d9f67153ed1";
  const redirectUri = "http://localhost:3000/github";
  const locateGit = `https://github.com/login/oauth/authorize?client_id=${GitKey}&redirect_uri=${redirectUri}`;

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

// const Container = styled.div`

//    background-color: white;
//    box-sizing: border-box;

// `;
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
  background-color: transparent;
  margin: 0;

  background-image: url("/img/login_btn_white.svg");
  background-position: center;
  background-size: 100%, 100%, cover;
  background-repeat: no-repeat;

  width: 14.06vw;
  height: 3.91vw;

  justify-content: center;
  align-items: center;
  font-size: 1.56vw;
  font-family: Neo;
  line-height: 1;

  &:hover {
    background-image: url("/img/login_btn_black.svg");
    & a {
      color: white;
    }
  }
`;

const BtnA = styled.a`
  text-decoration: none;
  color: black;
  /* margin-top: 1.91vw; */
`;
