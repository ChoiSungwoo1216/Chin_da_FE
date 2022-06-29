import React from "react";
import styled from "styled-components";
import LoginModal from "./LoginModal";
import Login from "../Login/Login";
//import Logo from "img/githubLogo.png"
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

const Start = () => {

    const [modalOpen, setModalOpen] = React.useState(false);

    const open = ()=>{
        setModalOpen(true);
    }
    const close = ()=>{
        setModalOpen(false);
    }

    return(
        <div>
            <StartPage>
                <NavBar top="0px"/>
                    <Main>
                        <Logo src="/img/githubLogo.png"/>
                        <LoginBtn onClick={open} >Login</LoginBtn>
                        <LoginModal open={modalOpen} close={close}>
                        
                        </LoginModal>
                    </Main>
                <NavBar bottom="0px"/>
            </StartPage>
        </div>
    )
}

export default Start;

const StartPage = styled.div`
    width:100vw;
    height: 100vh;
    text-align: center;
    
`

const NavBar = styled.div`
    width: 100%;
    height: 30px;
    background-color: lightblue;
    box-sizing:border-box;
    border: 1px solid #2d6bcb;
    position: absolute;
    top: ${(props)=> props.top};
    bottom: ${(props)=> props.bottom};
    position: absolute;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Logo = styled.img`
    width: 588px;
    height: 225px;
    //position: absolute;
    box-sizing: border-box;
    border: 1px solid red;
    margin: 186px 346px auto;
`
const LoginBtn = styled.div`
    width:180px;
    height: 50px;
    border-radius: 2px;
    border: 1px solid black;
    margin:115px 0 auto;
    

`
