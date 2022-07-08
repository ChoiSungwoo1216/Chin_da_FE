import React from "react";
import Login from "./Login";
import "./LoginModal.css";

const LoginModal = (props) => {
  const { open, close } = props;

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <>
          <section>
            <header>
              <p>L O G I N</p>
              {/* <img src="img/login_header.png" alt="modal_bar" /> */}
              <div className="close" onClick={close}>
                {/* <img src="img/X_btn_white_30.png" alt="xbtn" /> */}
              </div>
            </header>
            <main>
              {/* <img src="img/login_modal_gray.png" alt="modal_main" /> */}
              <Login />
            </main>
          </section>
        </>
      ) : null}
    </div>
  );
};

export default LoginModal;
