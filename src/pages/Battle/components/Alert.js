import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Alert.css";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../../../redux/modules/battleFunction.js";

const XBtn = ({ closeToast }) => {
  return (
    <div>
      <img src="/img/X_btn_black_30.svg" alt="xbtn" onClick={closeToast} />
    </div>
  );
};

const Alert = () => {
  const alertMsg = useSelector((state) => state.battleFunction.alertMsg);
  const runAlert = useSelector((state) => state.battleFunction.alertRun);
  const dispatch = useDispatch();
  const ToastDefault = () => {
    toast.error(`${alertMsg}`, {
      icon: "🚀",
      progress: undefined,
      theme: "colored",
      delay: 0,
      closeButton: <XBtn />,
    });
  };

  const runAndRefresh = async () => {
    ToastDefault();
    await dispatch(setAlert(false));
  };
  const onToast = () => {
    return runAlert === true && runAndRefresh();
  };

  useEffect(() => {
    onToast();
  }, [runAlert]);

  return (
    <>
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
