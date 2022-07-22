import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Timer(p) {
  const times = p.value.Time; // 난이도별 시간
  const active = p.value.Active;

  const minute = Math.floor(times / 60); // 분
  const second = times - minute * 60; // 초

  const [minutes, setMinutes] = useState(minute);
  const [seconds, setSeconds] = useState(second);
  const [send, setSend] = useState("")

  useEffect(() => {
    setMinutes(minute);
    setSeconds(second);
  }, [times]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (active === true) {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
          seconds % 10 === 0 ? setSend(true) : setSend(false);
        }
        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            clearInterval(countdown);
          } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59);
            seconds % 10 === 0 ? setSend(true) : setSend(false);
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
