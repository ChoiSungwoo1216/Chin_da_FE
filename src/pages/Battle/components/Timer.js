import React, { useState, useEffect } from "react";
import "./ProgressBar.css";

function Timer(p) {
  const times = p.value.Time; // 난이도별 시간
  const active = p.value.Active;

  const minute = Math.floor(times / 60); // 분
  const second = times - minute * 60; // 초

  const [minutes, setMinutes] = useState(minute);
  const [seconds, setSeconds] = useState(second);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (active === true) {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            clearInterval(countdown);
          } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59);
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
    <span className="counter">
      Round[n]{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </span>
  );
}

export default Timer;
