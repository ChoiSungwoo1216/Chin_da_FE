import { useEffect } from "react";
import axios from "axios";
import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

const GitLogin = ({ setMMute }) => {
  let API = process.env.REACT_APP_API;
  function loading(a) {
    setTimeout(() => {
      window.location.replace(a);
    }, 2000);
  }
  const bgmOff = () => {
    setMMute(true);
  };
  const gitAxios = async () => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    await axios({
      method: "get",
      url: `${API}/login/oauth2/code/github`,
      params: {
        code: code,
      },
    })
      .then((res) => {
        sessionStorage.setItem("Authorization", res.data.token);
        sessionStorage.setItem("username", res.data.username);
        sessionStorage.setItem("newUser", res.data.newUser);
        loading("/selection");
      })
      .catch((err) => {
        if (err.response.data.reLogin === true) {
          window.alert(err.response.data.error);
          sessionStorage.clear();
          localStorage.clear();
        } else {
          window.alert(err.response.data);
        }
        console.log(err);
        loading("/"); //login으로 수정
      });
  };

  useEffect(() => {
    bgmOff();
    gitAxios();
  }, []);

  return (
    <GitContainer>
      <Gitimage></Gitimage>
      <GitLogo onClick={() => gitAxios()} />
    </GitContainer>
  );
};

export default GitLogin;
const LoadingSpin = keyframes`
    from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const GitContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Gitimage = styled.div`
  width: 20vw;
  height: 20vw;
  display: flex;
  top: 30%;
  left: 40%;
  border-radius: 100%;
  position: absolute;
  background: url("/img/github_logo.svg") center no-repeat;
  background-color: rgba(255, 255, 255, 0.55);
  background-size: 100% 100%;

  animation: none;
`;
const GitLogo = styled.div`
  display: flex;
  position: absolute;

  width: 18%;
  height: 18vw;

  top: 30%;
  left: 40%;

  /* height: 100px;
  width: 100px; */
  border: 1vw ridge #fff;

  border-top-color: rgba(89, 91, 131, 0.6);
  border-right-color: rgba(51, 52, 86, 1);
  border-left-color: rgba(6, 9, 48, 1);
  border-bottom-color: rgba(51, 52, 86, 0.6);
  border-radius: 100%;
  animation: ${LoadingSpin} 1000ms linear infinite;
`;
