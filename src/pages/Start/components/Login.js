import React from "react";
import styled from "styled-components";

const Login = () => {

   const GitKey = "44af62885d9f67153ed1";
   const redirectUri = "http://localhost:3000/github"
   const locateGit = `https://github.com/login/oauth/authorize?client_id=${GitKey}&redirect_uri=${redirectUri}`;

   return (
      <>
         <Container>
            <Title>
               <Text margin="0px" width="300px" height="96px">너 개발자면서 github도</Text>
               <Text margin="53px" width="300px" height="96px">없는건 아니겠지?</Text>
               <GithubBtn>
                  <BtnTxt href={locateGit} git={locateGit}><img src="img/login_btn_white.png" alt="login_white"/></BtnTxt>
               </GithubBtn>
            </Title>
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

const GithubBtn = styled.button` 
   cursor: pointer;
   position: absolute;
   margin: 151px;
   display: flex;
   background-color: transparent;
`;

const BtnTxt = styled.a`
   text-decoration: none;
`;

const Title = styled.div`
   justify-content: center;
   text-align: center;
   display: flex;
`;

const Text = styled.p`
   position: absolute;
   font-size: 25px;
   line-height:96px;
   justify-content: center;
   margin: ${(props)=> props.margin};
   width: ${(props)=> props.width};
   height: ${(props)=> props.height};
`;
