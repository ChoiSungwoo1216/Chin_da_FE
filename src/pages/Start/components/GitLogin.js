import { useEffect } from "react";
import axios from "axios";
import React from "react";
import styled from "styled-components";
import "./Loading.css";
//import {useNavigate} from "react-router-dom";

const GitLogin = () => {
  //const navigate = useNavigate();
  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    console.log(code);
    axios
      .post(
        `http://123.4125.432/hsost
            `,
        code,
        {
          headers: {
            //authorizationCode: authorizationCode,
          },
        }
      )
      .then((res) => {
        console.log(res);
        //navigate('/main')
        // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
      })
      .catch((err) => {
        console.log(err);
        //navigate('/')
      });
  }, []);

  return (
    <GitContainer>
      <Gitimage></Gitimage>
      <GitLogo />
    </GitContainer>
  );
};

export default GitLogin;

const GitContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Gitimage = styled.div`
  width: 20%;
  height: 20vw;
  display: flex;
  top: 30%;
  left: 40%;
  border-radius: 100%;
  position: absolute;
  background: url("/img/githubLogo.png") center no-repeat;
  background-size: cover;
  animation: none;
`;
const GitLogo = styled.div`
  display: flex;
  position: absolute;
  width: 18%;
  height: 18vw;
  border: 1px solid white;
  top: 30%;
  left: 40%;

  /* height: 100px;
  width: 100px; */
  border: 1vw solid #fff;

  border-right-color: darkgray;
  border-top-color: gray;
  border-left-color: red;
  border-bottom-color: blue;
  border-radius: 100%;
  animation: spin 1000ms linear infinite;
`;
