import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import "./SoundSetting.css";
import { editsound } from "../redux/modules/user";
import axios from "axios";

const SoundSetting = (props) => {
  const { setSetting } = props;
  const dispatch = useDispatch();
  const userSound = useSelector((state) => state.user.sound);

  const SoundOnOff = (e) => {
    if (e.target.checked) {
      if (e.target.id === "switch") {
        dispatch(editsound({ bgm: 0.1 }));
        localStorage.removeItem("bgm");
        setTimeout(() => {
          localStorage.setItem("bgm", 0.1);
        }, 100);
      } else if (e.target.id === "switch1") {
        dispatch(editsound({ es: 0.5 }));
        localStorage.removeItem("es");
        setTimeout(() => {
          localStorage.setItem("es", 0.1);
        }, 100);
      }
    } else {
      if (e.target.id === "switch") {
        dispatch(editsound({ bgm: 0 }));
        localStorage.removeItem("bgm");
        setTimeout(() => {
          localStorage.setItem("bgm", 0);
        }, 100);
      } else if (e.target.id === "switch1") {
        dispatch(editsound({ es: 0 }));
        localStorage.removeItem("es");
        setTimeout(() => {
          localStorage.setItem("es", 0);
        }, 100);
      }
    }
  };

  const token = sessionStorage.getItem("Authorization");
  const api = process.env.REACT_APP_API;

  const logined = () => {
    if (token === null) {
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    axios({
      url:`${api}/chinda/logout`,
      method: "GET",
      headers: { Authorization: token },
    })
      .then((res) => {
        console.log(res);
        sessionStorage.clear();
        localStorage.clear();
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <SoundSettingBackground />
      <SettingDiv>
        <ExitSetting
          src={"/img/X_btn_black_30.svg"}
          alt=""
          onClick={() => setSetting(false)}
        />
        <WordDiv>
          <SettingWord>SETTING</SettingWord>
          <WhiteDiv>
            <SetLine>
              <SetName>배경음악</SetName>
              <input
                type="checkbox"
                id="switch"
                defaultChecked={userSound.bgm === 0.1 ? true : false}
                onClick={(e) => SoundOnOff(e)}
              />
              <label htmlFor="switch" className="switch_label">
                {userSound.bgm === 0.1 ? (
                  <img src={"/img/BtnOn.svg"} alt="" className="onf_btn" />
                ) : (
                  <img src={"/img/BtnOff.svg"} alt="" className="onf_btn" />
                )}
              </label>
            </SetLine>
            <SetLine>
              <SetName>효과음</SetName>
              <input
                type="checkbox"
                id="switch1"
                defaultChecked={userSound.es === 0.5 ? true : false}
                onClick={(e) => SoundOnOff(e)}
              />
              <label htmlFor="switch1" className="switch_label1">
                {userSound.es === 0.5 ? (
                  <img src={"/img/BtnOn.svg"} alt="" className="onf_btn1" />
                ) : (
                  <img src={"/img/BtnOff.svg"} alt="" className="onf_btn1" />
                )}
              </label>
            </SetLine>

            {logined ? (
              <LogOutBtn onClick={logout}>
                <p>LogOut</p>
              </LogOutBtn>
            ) : (
              <></>
            )}
          </WhiteDiv>
        </WordDiv>
      </SettingDiv>
    </>
  );
};
export default SoundSetting;

const SoundSettingBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  z-index: 12;
`;
const SettingWord = styled.div`
  font-size: calc((2.7vw + 2.7vh) / 2);
  z-index: 12;
  color: white;
  font-weight: 600;
  width: calc(100% - 7px);
  height: 4vh;
  gap: 1em;
  text-align: center;
  letter-spacing: 0.5vw;
  padding-top: 1vh;
  background-color: #5777ce;
  border-top: 3px solid #c0cfff;
  border-left: 3px solid #c0cfff;
  border-right: 2px solid #c0cfff;
  border-bottom: 5px solid black;
`;

const SettingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
  margin: 0;
  padding: 0;
  background: #fff;
  height: 44vh;
  width: 32vw;
  border: 5px solid black;
`;

const WhiteDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1.5vh auto;
  width: calc(100% - 4px);
  height: 79%;
`;

const LogOutBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/img/login_btn_white.svg");
  background-position: center;
  background-size: 100%, 100%, contain;
  background-repeat: no-repeat;
  margin-top: 6vh;
  width: calc((27vh + 40vw) / 4);
  height: calc((20vh + 20vw) / 8);
  font-size: 1.6vw;
  cursor: pointer;
  @keyframes push {
    50% {
      transform: scale(0.98);
    }
    100% {
      transform: scale(1);
    }
  }
  &:hover {
    background-image: url("/img/login_btn_black.svg");
    cursor: pointer;
    animation-name: push;
    animation-duration: 0.5s;
    animation-timing-function: ease-in;
    animation-iteration-count: 1;
    & p {
      color: white;
    }
  }
`;
const SetLine = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 0.3vh 0;
  margin-top: 3vh;
`;

const SetName = styled.div`
  position: relative;
  width: 8vw;
  height: 7vh;
  line-height: 7vh;
  font-size: calc((1.9vw + 1.9vh) / 2);
  font-weight: 600;
  padding-right: 4vw;
  text-align: left;
`;

const ExitSetting = styled.img`
  position: absolute;
  top: calc((2.7vw + 2.7vh) / 4 * -1);
  right: calc((2.7vw + 2.7vh) / 4 * -1);
  width: calc((2.7vw + 2.7vh) / 2);
  height: calc((2.7vw + 2.7vh) / 2);
  z-index: 12;

  @keyframes push {
    50% {
      transform: scale(0.98);
    }
    100% {
      transform: scale(1);
    }
  }
  &:hover {
    content: url(/img/X_btn_white_30.svg);
    cursor: pointer;
    animation-name: push;
    animation-duration: 0.5s;
    animation-timing-function: ease-in;
    animation-iteration-count: 1;
  }
`;

const WordDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 99.5%;
  height: 100%;
  border-left: 2px solid #fffae3;
  border-right: 2px solid #c1b78e;
  border-bottom: 2px solid #a0935c;
`;
