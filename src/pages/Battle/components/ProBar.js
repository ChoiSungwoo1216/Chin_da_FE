import React,{useEffect} from "react";
import styled, { keyframes, css } from "styled-components";
import Timer from "./Timer";

const ProgressBarTwo = (p) => {
  const time = p.value.Time / 10;
  const active = p.value.Active;
  const setActive = p.value.setActive;
  const checkT = p.checkT

  let [count, setCount] = React.useState(10);
  useEffect(() => {
active === false && setCount(10);
  }, [active]);

  useEffect(() => {
    const countdown = setInterval(() => {
      const refesh = () => {
        setCount(10);
        setActive(false);
        clearInterval(countdown);
      };
      if (active === true) {
        if (count > 0) {
          setCount(parseInt(count) - 1);
        } else {
          refesh();
        }
      } else {
        refesh();
      }
    }, time * 1000);
    return () => clearInterval(countdown);
  }, [count, active]);

  const calculator = (b) => {
    let block = [];
    for (let i = 0; i < b; i++) {
      block.push(i);
    }
    return block;
  };

  return (
    <>
      <Bar>
        <Filler>
          {calculator(count)?.map((idx) => {
            return <CountBox key={idx} active={active} count={count} />;
          })}
        </Filler>
        <Timer value={p.value} checkT={checkT}/>
      </Bar>
    </>
  );
};

export default ProgressBarTwo;

const Blink = keyframes`
  from{
    opacity: 0.3;
  }
  to{
    opacity: 1;
  }
`;

const Bar = styled.div`
  display: flex;
  position: relative;
  width: 48.5vw;
  height: 5.94vh; //3.91vw 6.94vh 50px
  /* border: 1px solid white; */
  flex-direction: row;
  align-items: center;
  /* background: url("/img/pro_new_new.svg") no-repeat center fixed; */
  background-size: cover;
  background-color: rgba(211, 211, 211, 0.1);
  border-top: 10px solid #ffffff;
  border-left: 0.86vw solid #c4c1b5;
  border-right: 0.86vw solid #c1b78e;
  border-bottom: 10px solid #a0935c;
  border-radius: 10px;
  bottom: 0.7vh;
  /* background-attachment: fixed; */
  //default 690x40, new 690x50, new_new 640x50
`;

const Filler = styled.div`
  width: 100%;
  height: 100%;
  /* border: 1px solid blue; */
  display: inherit;
  position: inherit;
  justify-content: flex-start;
  /* background-color: white; */
`;
const CountBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 7.24%; //46.375 92.75%
  height: 3.89vh;
  top: 1.2vh;
  margin-left: 1.25vw;
  background-color: #5777ce;
  background: url("/img/progress_block.svg") no-repeat center;
  background-size: 100% 100%;
  border-radius: 7px;
  ${(props) =>
    props.count < 6
      ? css`
          &:last-child {
            animation: ${Blink} 0.5s linear infinite;
          }
        `
      : props.active === true
      ? css`
          &:last-child {
            animation: ${Blink} 1s linear infinite;
          }
        `
      : css`
          &:last-child {
            animation: none;
          }
        `}
`;

// &:last-child {
//   ${(props) =>
//     props.active === true
//       ? css`
//           animation: ${Blink} 1s linear infinite;
//         `
//       : css`
//           animation: none;
//         `}
// }
