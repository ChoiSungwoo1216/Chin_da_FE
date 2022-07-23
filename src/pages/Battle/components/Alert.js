import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Alert.css";

const XBtn = ({ closeToast }) => {
  return (
    <div>
      <img src="/img/X_btn_black_30.svg" alt="xbtn" onClick={closeToast} />
    </div>
  );
};

const Alert = (p) => {
  // const runValue = p.value;
  const runValue = p.runAlert;
  const refresh = p.setRunAlert;
  const mesAlert = p.mesAlert;

  // console.log(runValue + "--alert");
  const ToastDefault = () => {
    //type선언 default:toast, type: toast.success,error,warning,info,promise,dismiss
    toast.error(
      `${mesAlert}`, //Component도 사용가능
      {
        //toast default 속성값 선언 안해도 됨
        // position: "top-right",
        // autoClose: 5000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        //⬆⬆⬆ toastContainer와 공유하는 설정 값
        //⬆⬆⬆ 유형별 속성 정의가 필요하면 본 위치에서 설정
        icon: "💫", //default true false 및 이모지나 이미지 설정가능 "💫" or
        //아이콘 : ( { theme, type } ) => < img src = " url " /> 현재 테마와 타입을 프롭스로 사용함
        //⬆⬆⬆ 공유값이긴 하나 컨테이너보단 toast에서 개별 설정해주는게 편함

        //⬇⬇⬇ toast 단일 설정 값
        progress: undefined, //몰?루
        theme: "colored", // colored dark default
        delay: 0, //default 0 ms
        closeButton: <XBtn />, //default true component로 이미지적용가능
      }
    );
  };

  // const RunToast = () => {
  //   return runValue === true ? ToastDefault() : null;
  // };
  const runAndRefresh = async () => {
    ToastDefault();
    await refresh(false);
  };
  const onToast = () => {
    return runValue === false ? null : runAndRefresh();
  };

  useEffect(() => {
    onToast();
    // console.log(runValue);
  }, [runValue]);

  return (
    <>
      {/* <button onClick={ToastDefault}></button> */}
      <ToastContainer
        //default 설정값은 선언안해도 됨
        position="top-right" //default top-right
        autoClose={3000} //default 5000 단위ms 기능 미동작을 원할시에는 false로 설정
        hideProgressBar={false} //default false
        closeOnClick={false} //default true 클릭시 닫히는 기능
        pauseOnHover={false} //default true hover시 일시정지하는 기능
        draggable={false} //default true 밀어서 닫는 기능, 숫자입력시 퍼센트로 치환
        //transition default slide, zoom flip bounce import하고 사용가능, 커스텀 가능
        //⬆⬆⬆ toast와 속성 공유
        //⬇⬇⬇toastContainer고유 설정값
        newestOnTop={false} //default false 최근 생성된 알람이 위치할 포지션
        rtl={false} //default false rtl-> right to left layout
        pauseOnFocusLoss={false} //default true 페이지에서 포커스 해제되면 일시정지하는 기능
        limit={5} //default false 갯수 제한시 출력을 거부하는게 아닌 스택이 쌓인후 순서대로 동작
      ></ToastContainer>
    </>
  );
};

export default Alert;
