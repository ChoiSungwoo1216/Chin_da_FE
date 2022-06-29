import React from "react";
import styled from "styled-components";

// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

const Login = () => {

    return (
       <>
          <Container>
             <Title>
                <Text margin="20px 41px 0 41px" width="302px" height="96px">너 개발자면서 github도</Text>
                <Text margin="0 78px 10px 78px">없는건 아니겠지?</Text>
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
    display: flex;
    flex-direction: column;
    border: 1px red solid;
    width: 384px;
    height: 250px;
    
    box-sizing: border-box;
    
`;

const BtnContainer = styled.div`
    
    align-items: center;
    margin: 171px 102px auto;
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
   
    
` 
const Title = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   text-align: center;
   
   ;
`;

const Text = styled.p`
   position: absolute;
   font-size: 25px;
   line-height:96px;
   margin: ${(props)=> props.margin};
   width: ${(props)=> props.width};
   height: ${(props)=> props.height};
`