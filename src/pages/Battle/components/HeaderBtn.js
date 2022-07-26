import React from "react"
import styled, { css, keyframes } from "styled-components"
import {useSelector} from "react-redux";
import effectSound from '../../../shared/effectSound';
import btnSound from '../../../audios/btnselect.mp3';

const HeaderBtn = ({ BackToMain, dispatch, ModalOpen }) => {

    const modal = useSelector((state) => state.battleFunction.modalOpen);

    const userSound = useSelector((state) => state.user.sound);
    const btnEs = effectSound(btnSound, userSound.es);

    //채팅 열고 닫기
    const openChat = () => {
        btnEs.play();
        if (modal.chat === true) {
            dispatch(ModalOpen({ chat: false }));
        } else {
            dispatch(ModalOpen({ chat: true }));
        }
    };


    //문제 열고 닫기
    const openQue = () => {
        btnEs.play();
        if (modal.que === true) {
            dispatch(ModalOpen({ que: false }));
        } else {
            dispatch(ModalOpen({ que: true }));
        }
    }

    // 규칙 열고 닫기
    const openrule = () => {
        btnEs.play();
        if (modal.rule === true) {
            dispatch(ModalOpen({ rule: false }));
        } else {
            dispatch(ModalOpen({ rule: true }));
        }
    }

    return (
        <>
            <BtnOnOff onClick={openQue} change={modal.que}>
                문제
            </BtnOnOff>
            <BtnOnOff onClick={openChat} change={modal.chat}>
                채팅
            </BtnOnOff>
            <BtnOnOff onClick={openrule} change={modal.rule}>규칙</BtnOnOff>
            <ExitBtn onClick={BackToMain}>나가기</ExitBtn>
        </>
    )
}

export default HeaderBtn

const BattleBtnAni = keyframes`
0% {
  transform: translateY(0);
}
25%{
  transform: translateY(-5px);
}
50%{
  transform: translateY(0);
}
75%{
  transform: translateY(5px);
}
100% {
  transform: translateY(0px);
}
`;

const BtnOnOff = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: calc((3vh + 3vw) / 4);
   color: white;
   width: 13.5%;
   height: 100%;
   ${(props) => {
        if (props.change) {
            return css`
            background-image: url(/img/questionBtnBlack.svg);
            border: 2px inset #c1b78e;
            border-radius: 10px;
         `;
        }
        return css`
         background-image: url(/img/questionBtnBlue.svg);
         border: 2px inset #5777ce;
         border-radius: 10px;
      `;
    }}
   background-position: center;
   background-repeat: no-repeat;
   background-size: contain;
   animation: ${BattleBtnAni} 3s 0.5s linear infinite;
`;

const ExitBtn = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: calc((3vh + 3vw) / 4);
   color: white;
   width: 30%;
   height: 100%;
   background-image: url(/img/ExitBattleBtn.svg);
   background-position: center;
   background-repeat: no-repeat;
   background-size: contain;
   animation: ${BattleBtnAni} 3s linear infinite;
   border: 2px inset #5777ce;
   border-radius: 10px;
`;