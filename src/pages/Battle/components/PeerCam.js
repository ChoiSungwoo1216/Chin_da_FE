import React, { useEffect, useState } from "react"
import styled, { css } from "styled-components"

export const UserCam = ({ camEs, currentUserVideoRef }) => {
    const [userCamSlide, setUserCamSlide] = useState(true);

    const openUserCam = () => {
        camEs.play();
        if (userCamSlide === true) {
            currentUserVideoRef.current.srcObject.getVideoTracks().forEach((track) => (track.enabled = false));
            setUserCamSlide(false);
        } else {
            currentUserVideoRef.current.srcObject.getVideoTracks().forEach((track) => (track.enabled = true));
            setUserCamSlide(true);
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
            <Cam open={userCamSlide}>
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

        </UserCamDiv>
    )
}

export const OpCam = ({ camEs, remoteVideoRef, remotePeerIdValue }) => {

    const [opCamSlide, setOpCamSlide] = useState(true);

    useEffect(() => {
        CheckOp();
    }, [remotePeerIdValue])

    const CheckOp = () => {
        if (remotePeerIdValue === "" || remotePeerIdValue === undefined || remotePeerIdValue === null) {
            setOpCamSlide(false);
        } else {
            setOpCamSlide(true);
        }
    }

    const openOpCam = () => {
        camEs.play();
        if (opCamSlide) {
            if (remoteVideoRef.current.srcObject !== null) {
                remoteVideoRef.current.srcObject.getVideoTracks().forEach((track) => (track.enabled = false));
            }
            setOpCamSlide(false);
        } else {
            if (remoteVideoRef.current.srcObject!== null) {
                remoteVideoRef.current.srcObject.getVideoTracks().forEach((track) => (track.enabled = true));
            }
            setOpCamSlide(true);
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
            <Cam open={opCamSlide}>
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
  z-index: 5;
  height: 22.6vh;
  width: 14vw;
`;
const CamBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 3vw;
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
    ${(props) => {
        if (props.open !== true) {
            return css`
            display : none;
            `
        } else {
            return css`
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
            `
        }
    }}
`;