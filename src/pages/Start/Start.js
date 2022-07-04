import React from "react";
import styled from "styled-components";
import LoginModal from "./components/LoginModal";
import './SpaceBg.css';

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
            <Main id="SpaceBG">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>                        
                <div id="title">
                    <span>친 다</span>
                    <button id="loginBtn"  >
                        <img src="img/login_btn_black.png" alt="login_black" onClick={open}/>
                    </button>
                </div>                                              
                <LoginModal open={modalOpen} close={close}/>  
            </Main>
        </div>
    )
}

export default Start;

const Main = styled.div`
    display: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
