import React, { useState } from "react"
import styled from "styled-components"

export const UserCam = ({ camEs, call, currentUserVideoRef, remotePeerIdValue }) => {
    const [userCamSlide, setUserCamSlide] = useState(true);

    const openUserCam = () => {
        camEs.play();
        if (userCamSlide) {
            setUserCamSlide(false);
        } else {
            setUserCamSlide(true);
            call(remotePeerIdValue);
        }
    };

    return (
        <UserCamDiv>
            <CamBar>
                <span>Player1</span>
                <CamIcon
                    src={
                        userCamSlide === true
                            ? "/img/cam_icon.svg"
                            : "/img/cam_double_cross.svg"
                    }
                    alt=""
                    onClick={openUserCam}
                />
            </CamBar>
            {userCamSlide && (
                <Cam>
                    <video
                        style={{
                            width: "auto",
                            maxWidth: "100%",
                            height: "auto",
                            objectFit: "cover",
                        }}
                        ref={currentUserVideoRef}
                    />
                    <img src="/img/camdouble_cross.svg" alt="" />
                </Cam>
            )}
        </UserCamDiv>
    )
}

export const OpCam = ({ camEs, call, remoteVideoRef, remotePeerIdValue }) => {

    const [opCamSlide, setOpCamSlide] = useState(true);
    const openOpCam = () => {
        camEs.play();
        if (opCamSlide) {
            setOpCamSlide(false);
        } else {
            setOpCamSlide(true);
            call(remotePeerIdValue);
        }
    };
    return (
        <OpCamDiv>
            <CamBar>
                <span>Player2</span>
                <CamIcon
                    src={
                        opCamSlide === true
                            ? "/img/cam_icon.svg"
                            : "/img/cam_double_cross.svg"
                    }
                    alt=""
                    onClick={openOpCam}
                />
            </CamBar>
            {opCamSlide && (
                <Cam>
                    <video
                        style={{
                            width: "auto",
                            maxWidth: "100%",
                            height: "auto",
                            objectFit: "cover",
                        }}
                        ref={remoteVideoRef}
                    />
                    <img src="/img/camdouble_cross.svg" alt="" />
                </Cam>
            )}
        </OpCamDiv>
    )
}


const UserCamDiv = styled.div`
  position: absolute;
  left: 40.5%;
  top: 9vh;
  height: 22.6vh;
  width: 14vw;
  z-index: 5;
`;

const OpCamDiv = styled.div`
  position: absolute;
  right: -2.6%;
  top: 8.9vh;
  height: 22.6vh;
  width: 14vw;
`;
const CamBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30%;
  width: 85%;
  height: 18%;
  background-color: #5777ce;
  color: white;
  font-size: calc((2vh + 2vw) / 2);
  opacity: 0.8;
  border: 3px solid black;
`;

const CamIcon = styled.img`
  width: calc((2vh + 2vw) / 2);
  height: calc((2vh + 2vw) / 2);
  &:hover {
    content: url("/img/cam_cross.svg");
  }
`;

const Cam = styled.div`
  display: flex;
  width: 11.89vw;
  height: 11.9vw;
  background-color: #202540;
  border-left: 3px solid black;
  border-right: 3px solid black;
  border-bottom: 3px solid black;
  background-image: url(/img/cam_double_cross.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;