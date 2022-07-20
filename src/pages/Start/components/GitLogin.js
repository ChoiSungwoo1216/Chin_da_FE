import { useEffect } from "react";
import axios from "axios";
import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const GitLogin = () => {
  const navigate = useNavigate();

  function loading(a) {
    setTimeout(() => {
      navigate(`/${a}`);
    }, 3000);
  }
  const client_secret = "7fdbc1019122ced80cfffef473cfa4b3398e2df3";
  const client_id = "44af62885d9f67153ed1";

  const gitAxios = async () => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    // const GitApi = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
    // console.log(GitApi);
    // axios.defaults.withCredentials = true;
    await axios({
      method: "post",
      url: ``,
      data: { client_id, client_secret, code },
    })
      .then((res) => {
        console.log(res.data);
        loading("selection");
        //
      })
      .catch((err) => {
        console.log(err.response.status + "------err");
        loading("selection");//login으로 수정
      });
  };

  useEffect(() => {
    gitAxios();
  }, []);

  return (
    <GitContainer>
      <Gitimage></Gitimage>
      <GitLogo />
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
