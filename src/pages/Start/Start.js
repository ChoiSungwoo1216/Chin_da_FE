import React from "react";
import styled from "styled-components";
import LoginModal from "./LoginModal";
import './SpaceBg.css';

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
            {/* <StartPage id="Spage"> */}
                {/* <NavBar top="0px"/> */}
                    <Main id="SpaceBG">
                    <div id="stars"></div>
                        <div id="stars2"></div>
                        <div id="stars3"></div>
                        <div id="title">
                        <span>친 다</span><br />
                        <button id="loginBtn" onClick={open} >Login</button>
                        </div>
                        {/* <Logo src="/img/githubLogo.png"/> */}
                        
                        <LoginModal open={modalOpen} close={close}/>
                        {/* <img src="img/githubLogo.png" alt="ex" id="test"/> */}
                    </Main>
                {/* <NavBar bottom="0px"/> */}
            {/* </StartPage> */}
            </div>
    )
}

export default Start;



// const NavBar = styled.div`
//     width: 100%;
//     height: 30px;
//     background-color: lightblue;
//     box-sizing:border-box;
//     border: 1px solid #2d6bcb;
//     position: absolute;
//     top: ${(props)=> props.top};
//     bottom: ${(props)=> props.bottom};
//     position: absolute;
// `

const Main = styled.div`
    display: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
// const Logo = styled.img`
//     width: 588px;
//     height: 225px;
//     //position: absolute;
//     box-sizing: border-box;
//     border: 1px solid red;
//     margin: 186px 346px auto;
// `
const LoginBtn = styled.div`
    width:180px;
    height: 50px;
    border-radius: 2px;
    border: 1px solid black;
    margin:115px 0 auto;
    line-height: 3.5;

`
