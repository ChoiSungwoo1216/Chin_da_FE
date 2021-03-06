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
    toast.error(`${mesAlert}`, {
      icon: "๐ซ",
      progress: undefined,
      theme: "colored",
      delay: 0,
      closeButton: <XBtn />,
    });
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
        //default ์ค์ ๊ฐ์ ์ ์ธ์ํด๋ ๋จ
        position="top-right" //default top-right
        autoClose={3000} //default 5000 ๋จ์ms ๊ธฐ๋ฅ ๋ฏธ๋์์ ์ํ ์์๋ false๋ก ์ค์ 
        hideProgressBar={false} //default false
        closeOnClick={false} //default true ํด๋ฆญ์ ๋ซํ๋ ๊ธฐ๋ฅ
        pauseOnHover={false} //default true hover์ ์ผ์์ ์งํ๋ ๊ธฐ๋ฅ
        draggable={false} //default true ๋ฐ์ด์ ๋ซ๋ ๊ธฐ๋ฅ, ์ซ์์๋ ฅ์ ํผ์ผํธ๋ก ์นํ
        //transition default slide, zoom flip bounce importํ๊ณ  ์ฌ์ฉ๊ฐ๋ฅ, ์ปค์คํ ๊ฐ๋ฅ
        //โฌโฌโฌ toast์ ์์ฑ ๊ณต์ 
        //โฌโฌโฌtoastContainer๊ณ ์  ์ค์ ๊ฐ
        newestOnTop={false} //default false ์ต๊ทผ ์์ฑ๋ ์๋์ด ์์นํ  ํฌ์ง์
        rtl={false} //default false rtl-> right to left layout
        pauseOnFocusLoss={false} //default true ํ์ด์ง์์ ํฌ์ปค์ค ํด์ ๋๋ฉด ์ผ์์ ์งํ๋ ๊ธฐ๋ฅ
        limit={5} //default false ๊ฐฏ์ ์ ํ์ ์ถ๋ ฅ์ ๊ฑฐ๋ถํ๋๊ฒ ์๋ ์คํ์ด ์์ธํ ์์๋๋ก ๋์
      ></ToastContainer>
    </>
  );
};

export default Alert;
