import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  gameSwitch,
  sendCodeTiming,
  setPending,
} from "../../../redux/modules/battleFunction.js";

function Timer(p) {
  const sendT = useSelector((state) => state.battleFunction.sendRun);
  const gameStart = useSelector((state) => state.battleFunction.gameStatus);
  const dispatch = useDispatch();

  const times = p.Time; // 난이도별 시간
  const active = p.setActive;
  const { timeOutLose } = p;
  const sendCode = p.sendCode;

  const gameStartBoolRef = useRef();
  useEffect(()=>{
    gameStartBoolRef.current = gameStart;
  }, [gameStart])

  useEffect(() => {
    if (active === true) {
      setTimeout(() => sendCode(), 300);
    }
  }, [sendT]);

  const minute = Math.floor(times / 60); // 분
  const second = times - minute * 60; // 초

  const [minutes, setMinutes] = useState(minute);
  const [seconds, setSeconds] = useState(second);

  const checkT = () => {
    sendT ? dispatch(sendCodeTiming(false)) : dispatch(sendCodeTiming(true));
  };

  useEffect(() => {
    setMinutes(minute);
    setSeconds(second);
  }, [times]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (active === true) {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
          seconds % 30 === 0 && checkT();
        }
        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            clearInterval(countdown);
            dispatch(setPending({ user: true }))
            let i = 0;
            const Timeout = setInterval(() => {
              if (i === 4) {
                if (gameStartBoolRef.current === true) {
                  timeOutLose();
                }
                dispatch(setPending({ user: false }))
                clearInterval(Timeout)
              } else {
                i++;
              }
            }, 500)

          } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59);
            seconds % 10 === 0 && checkT();
          }
        }
      } else {
        setMinutes(minute);
        setSeconds(second);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [minutes, seconds, active]);

  return (
    <Counts className="counter">
      &nbsp;{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </Counts>
  );
}

export default Timer;

const Counts = styled.span`
  display: flex;
  position: absolute;
  width: 6.5%;
  top: 36%;
  left: 2.7%;
  justify-content: center;

  color: black;
  font-size: calc((1.5vh + 1.5vw) / 2);
`;
