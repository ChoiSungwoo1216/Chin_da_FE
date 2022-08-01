import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import "./SoundSetting.css";
import { editsound } from "../redux/modules/user";
import axios from "axios";

const SoundSetting = (props) => {
  const { setSetting } = props;
  const dispatch = useDispatch();
  const bgm = useSelector((state) => state.user.sound.bgm);
  const es = useSelector((state) => state.user.sound.es)

  const BgmControl = (value) => {
    dispatch(editsound({ bgm: Number(value) }));
    localStorage.removeItem("bgm");
    setTimeout(() => {
      localStorage.setItem("bgm", Number(value));
    }, 100);
  }

  const EsControl = (value) =>{
    dispatch(editsound({ es: Number(value) }));
    localStorage.removeItem("es");
    setTimeout(() => {
      localStorage.setItem("es", Number(value));
    }, 100);
  }

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
      url: `${api}/chinda/logout`,
      method: "GET",
      headers: { Authorization: token },
    })
      .then((res) => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.replace("/");
      })
      .catch((err) => {
        if (err.response.data.reLogin === true) {
          window.alert("로그인하세요");
        } else {
          window.alert(err.response.data);
        }
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
              <div className="bgmVolume">
                <div>
                  <input id="bgm0" type="radio" value="0" name="bgm" onClick={(e) => { BgmControl(e.target.value) }} defaultChecked={bgm === 0 ? true : false} />
                  <label htmlFor="bgm0">0%</label>
                </div>
                <div>
                  <input id="bgm25" type="radio" value="0.025" name="bgm" onClick={(e) => { BgmControl(e.target.value) }} defaultChecked={bgm === 0.025 ? true : false} />
                  <label htmlFor="bgm25">25%</label>
                </div>
                <div>
                  <input id="bgm50" type="radio" value="0.05" name="bgm" onClick={(e) => { BgmControl(e.target.value) }} defaultChecked={bgm === 0.05 ? true : false} />
                  <label htmlFor="bgm50">50%</label>
                </div>
                <div>
                  <input id="bgm75" type="radio" value="0.075" name="bgm" onClick={(e) => { BgmControl(e.target.value) }} defaultChecked={bgm === 0.075 ? true : false} />
                  <label htmlFor="bgm75">75%</label>
                </div>
                <div>
                  <input id="bgm100" type="radio" value="0.1" name="bgm" onClick={(e) => { BgmControl(e.target.value) }} defaultChecked={bgm === 0.1 ? true : false} />
                  <label htmlFor="bgm100">100%</label>
                </div>
              </div>
            </SetLine>
            <SetLine>
              <SetName>효과음</SetName>
               <div className="esVolume">
                <div>
                  <input id="es0" type="radio" value="0" name="es" onClick={(e) => { EsControl(e.target.value) }} defaultChecked={es === 0 ? true : false} />
                  <label htmlFor="es0">0%</label>
                </div>
                <div>
                  <input id="es25" type="radio" value="0.125" name="es" onClick={(e) => { EsControl(e.target.value) }} defaultChecked={es === 0.125 ? true : false} />
                  <label htmlFor="es25">25%</label>
                </div>
                <div>
                  <input id="es50" type="radio" value="0.25" name="es" onClick={(e) => { EsControl(e.target.value) }} defaultChecked={es === 0.25 ? true : false} />
                  <label htmlFor="es50">50%</label>
                </div>
                <div>
                  <input id="es75" type="radio" value="0.375" name="es" onClick={(e) => { EsControl(e.target.value) }} defaultChecked={es === 0.375 ? true : false} />
                  <label htmlFor="es75">75%</label>
                </div>
                <div>
                  <input id="es100" type="radio" value="0.5" name="es" onClick={(e) => { EsControl(e.target.value) }} defaultChecked={es === 0.5 ? true : false} />
                  <label htmlFor="es100">100%</label>
                </div>
              </div>
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
  justify-content: space-between;
`;

const SetName = styled.div`
  position: relative;
  width: 8vw;
  height: 7vh;
  line-height: 7vh;
  font-size: calc((1.9vw + 1.9vh) / 2);
  font-weight: 600;
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
