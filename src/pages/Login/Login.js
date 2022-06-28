import React from "react";
import styled from "styled-components";

// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

const Login = () => {

    return (
       <>
          <Container>
             <Title>
                <p>너 개발자면서 github도 없는건 설마 아니겠지?</p>
             </Title>
             <BtnContainer>
                <GithubBtn>
                   <GithubLogo src="img/githubLogo.png" alt="" />
                   <BtnTxt>Sign in with GitHub</BtnTxt>
                </GithubBtn>
             </BtnContainer>
          </Container>
       </>
    );
}

export default Login;
const Container = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GithubBtn = styled.button`
   display: flex;
   width: 170px;
   height: 50px;
   background-color: #000;
   color: #fff;
   border-radius: 7px;
   cursor: pointer;
`;
const GithubLogo = styled.img`
    margin: auto;
    width: 30px;
    height: 30px;
`
const BtnTxt = styled.p`

    margin: auto;
` 
const Title = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`;