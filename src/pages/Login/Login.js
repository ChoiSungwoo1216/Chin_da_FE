import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

const Login = () => {
   // &redirect_uri=${redirectUri}

   const GitKey = "44af62885d9f67153ed1";
   const redirectUri = "https://localhost:3000/github"
      

   const locateGit = `https://github.com/login/oauth/authorize?client_id=${GitKey}&redirect_uri=${redirectUri}`;

    return (
       <>
          <Container>
             <Title>
                <Text margin="0px" width="300px" height="96px">너 개발자면서 github도</Text>
                <Text margin="53px" width="300px" height="96px" top="0px">없는건 아니겠지?</Text>
                <GithubBtn>
                   <GithubLogo src="img/githubLogo.png" alt="" />
                   <BtnTxt href={locateGit} git={locateGit}>Sign in with GitHub</BtnTxt>
                </GithubBtn>
             </Title>
             <BtnContainer>
                
             </BtnContainer>
          </Container>
       </>
    );
}

export default Login;


const Container = styled.div`
    
    
    display: flex;
    flex-direction: column;
    
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: white;
    
    box-sizing: border-box;
    
`;

const BtnContainer = styled.div`
    
    
    display: flex;
   
    
`;

const GithubBtn = styled.button`
   width: 170px;
   height: 50px;
   background-color: #000;
   color: #fff;
   border-radius: 7px;
   cursor: pointer;
   position: absolute;
   margin: 151px;
   display: flex;
`;
const GithubLogo = styled.img`
    margin: auto;
    width: 30px;
    height: 30px;
`
const BtnTxt = styled.a`
   width: 120px;
   line-height: 4;
   text-decoration: none;
   color: white;
` 
const Title = styled.div`
   /* display: flex;
   flex-direction: column; */
   justify-content: center;
   text-align: center;
   display: flex;
   
   ;
`;

const Text = styled.p`
   position: absolute;
   font-size: 25px;
   line-height:96px;
   justify-content: center;
   margin: ${(props)=> props.margin};
   width: ${(props)=> props.width};
   height: ${(props)=> props.height};
`